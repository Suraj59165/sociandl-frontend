import {User} from '../../auth/models/user';
import {Menu} from '../../core/models/menu';
import {Master} from './master';

export class FrontendInitData {
  public currentUser: User;
  public menuList: Menu[];
  public exchangeRates: Master[];
}
