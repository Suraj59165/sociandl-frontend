import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {User} from '../../../auth/models/user';
import {MenuItem} from 'primeng/api';
import {CoreConst} from '../../../core/constants/core-const';
import {Router} from '@angular/router';
import {WebSocketService} from '../../../core/services/web-socket-service';
import {TokenService} from '../../../auth/services/token-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: User = CoreConst.CURRENT_USER;
  @ViewChild('profileContainer') profileContainer!: ElementRef;
  profilePopupVisible: boolean = false;

  constructor(private router: Router, protected webSocketService: WebSocketService) {
  }

  logOutUser() {
    TokenService.clearEverything();
    this.webSocketService.unsubscribeAll();
    this.router.navigate(['/auth']);
  }

  toggleProfilePopup() {
    this.profilePopupVisible = !this.profilePopupVisible;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const clickedInside = this.profileContainer?.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.profilePopupVisible = false;
    }
  }

}
