import {CoreConst} from '../constants/core-const';
import {Injectable} from '@angular/core';
import {Status} from '../../shared/constants/app-enum';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  userRoles:any[] = []

  preAuthorize(role: string): boolean {
    this.userRoles = CoreConst.USER_ROLE;
    return this.userRoles?.some(userRole => {
      return userRole.role === role && userRole.status === Status.ACTIVE;
    }) ?? false;
  }

}
