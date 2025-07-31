import {APP_INITIALIZER, Injectable} from '@angular/core';
import {TokenService} from '../../auth/services/token-service';
import {AuthService} from '../../auth/services/auth-service';
import {Router} from '@angular/router';
import {CoreConst} from '../constants/core-const';
import {User} from '../../auth/models/user';
import {Menu} from '../models/menu';
import {MenuItem} from 'primeng/api';
import {WebSocketService} from './web-socket-service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  menuItem: MenuItem[];

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private webSocketService: WebSocketService) {
  }

  async init(): Promise<any> {
    try {
      const isAuthenticated = await this.tokenService.IS_AUTHENTICATED_USER();
      if (isAuthenticated && !CoreConst.CURRENT_USER.id) {
        await this.getFrontendData();
      }
    } catch (err) {
      await this.router.navigate(['/auth']);
    }
  }

  async getFrontendData(): Promise<void> {
    try {
      console.log("inside getFrontendData");
      const response = await this.authService.initData().toPromise();
      if (response && response.status === 200 && response.data.data) {
        const data = response.data.data;
        if (data?.currentUser) {
          this.setCurrentUserAndRole(data.currentUser);
        }
        if (data?.menuList) {
          this.setHeaderMenu(data?.menuList);
        }
        if (data?.exchangeRates) {
          CoreConst.Masters = data?.exchangeRates;
        }
        if (data?.countries) {
          CoreConst.COUNTRIES = data?.countries;
        }
        if (data?.platformFees) {
          CoreConst.COUNTRY_PLATFORM_FEES = data?.platformFees;
        }
      }
    } catch (error) {
      console.error('Error fetching frontend data:', error);
    } finally {
      this.connectWebSocket()
    }
  }

  setHeaderMenu(menu: Menu[]) {
    CoreConst.menuItems = [];
    this.menuItem = []
    menu.forEach(item => {
      if (!item.parentId) {
        const menuObj: any = {label: item.name, routerLink: item.menuAction?.url};
        if (item.menuList && item.menuList.length > 0) {
          menuObj.items = [];
          item.menuList.forEach(subMenu => {
            menuObj.items.push({
              label: subMenu.name,
              routerLink: subMenu.menuAction?.url
            });
          });
        }
        this.menuItem.push(menuObj);
      }
    });
    CoreConst.menuItems = this.menuItem;
  }

  connectWebSocket() {
    this.webSocketService.connect()
  }

  private setCurrentUserAndRole(user: User) {
    CoreConst.CURRENT_USER = user;
    if (user.rolesList.length > 0) {
      CoreConst.USER_ROLE = user.rolesList;
    }
  }
}


export const AppInitProvider = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [AppInitService],
    multi: true
  }
];

export function initializeApp(appInitService: AppInitService): any {
  return () => appInitService.init();
}
