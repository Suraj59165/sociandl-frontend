import {Pipe, PipeTransform} from '@angular/core';
import {SpDateTimeService} from '../services/sp-date-time.service';
import {DateTimeOptionType} from '../constants/app-enum';

@Pipe({
  name: 'spDateTimeFormat',
  standalone: true,
})
export class SpDateTimeFormatPipe implements PipeTransform {
  constructor(private spDateTimeService: SpDateTimeService) {
  }

  transform(value: Date | string | number, format?: DateTimeOptionType): string {
    return this.spDateTimeService.transform(value, format)
  }

}
