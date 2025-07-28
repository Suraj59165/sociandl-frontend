import {User} from '../../auth/models/user';
import {CountryCurrency} from '../../shared/models/CountryCurrency';
import {Master} from '../../shared/models/master';
import {Roles} from '../models/roles';
import {MenuItem} from 'primeng/api';


export class CoreConst {
  public static CURRENT_USER: User = new User();
  public static USER_ROLE: Roles[] = [];
  public static menuItems: MenuItem[] = [];
  public static COUNTRIES: CountryCurrency[] = [];
  public static REFRESH_TOKEN_KEY = 'refresh-token';
  public static AUTHORIZATION_KEY = 'Authorization';
  public static DEPLOYMENT_IN_PROGRESS: boolean = false;
  public static Masters: Master[] = [];
  public static COUNTRY_PLATFORM_FEES: Master;

}

export const WEB_SOCKET_TOPICS = {
  COUNTRY_PLATFORM_FEES: '/topic/country_platform_fees/',
  AD_ORDER_CHAT: '/topic/ad-order/chat/',
  AD_ORDER_CHATS: '/topic/ad-order/chats/',
  AD_DETAILS: '/topic/ad/',
};

export const WEB_SOCKET_ENDPOINT = {
  CHAT_ENDPOINT: '/app/chat',
  CHATS_ENDPOINT: '/app/chats',
};

export enum HttpStatusCustom {
  SQL_EXCEPTION = 600,
  EXPIRED_JWT_EXCEPTION = 601,
  REFRESH_COOKIE_NOT_FOUND = 602,
  UNAUTHORIZED = 603,
  INTERNAL_SERVER_ERROR = 604,
  BAD_REQUEST = 400,
  USER_DISABLED = 606,
  REFRESH_TOKEN_EXPIRED = 607,
  DEPLOYMENT_IN_PROGRESS = 608,
  LICENSE_EXPIRED = 609,
  NOT_VERIFIED = 610,
  OTP_VERIFICATION_FAILED = 611,
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  ACCESS_DENIED = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  GONE = 410,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  USER_NOT_VERIFIED = 612,
  CUSTOM_MSG_EXCEPTION = 613,
  USER_NOT_FOUND = 614,
  PASSWORD_MISMATCH = 603,
  EXPIRED_OTP_EXCEPTION = 616,
  MISMATCH_OTP_EXCEPTION = 617,
  OPTIMISTIC_LOCK_EXCEPTION = 618
}





