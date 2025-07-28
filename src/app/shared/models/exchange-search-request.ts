import {MasterType} from '../constants/app-enum';
import {SearchRequest} from './search-request';

export class MasterSearchRequest extends SearchRequest {
  masterType: MasterType;
  code: string
}
