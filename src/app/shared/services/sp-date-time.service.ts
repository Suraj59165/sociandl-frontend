import {Injectable} from '@angular/core';
import {DateTimeOptionType} from '../constants/app-enum';

@Injectable({
  providedIn: 'root'
})
export class SpDateTimeService {

    transform(value: Date | string | number, format: DateTimeOptionType | undefined): string {
    if (value == null) return '';

    const date = value instanceof Date ? value : new Date(value);
    const isDuration = typeof value === 'number';

    if (!isDuration && isNaN(date.getTime())) return '';

    switch (format) {
      case DateTimeOptionType.DATE_ISO:
        return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`;
      case DateTimeOptionType.DATE_DMY:
        return `${this.pad(date.getDate())}-${this.pad(date.getMonth() + 1)}-${date.getFullYear()}`;
      case DateTimeOptionType.DATE_MDY:
        return `${this.pad(date.getMonth() + 1)}/${this.pad(date.getDate())}/${date.getFullYear()}`;
      case DateTimeOptionType.DATE_TIME_FULL:
        return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())} ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
      case DateTimeOptionType.TIME_EXACT:
        return `${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`;
      case DateTimeOptionType.TIME_HMS:
        return this.getDurationHMS(value as number);
      case DateTimeOptionType.TIME_MS:
        return this.getDurationMS(value as number);
      case DateTimeOptionType.TOTAL_SECONDS:
        return `${Math.floor((value as number) / 1000)} sec`;
      case DateTimeOptionType.DATE_TIME_12HR:
        return `${this.pad(date.getMonth() + 1)}/${this.pad(date.getDate())}/${date.getFullYear()} ${this.format12HourTime(date)}`;
      case DateTimeOptionType.DATE_MY:
        return `${this.pad(date.getMonth() + 1)}/${date.getFullYear()}`;
      default:
        return `${this.pad(date.getMonth() + 1)}/${this.pad(date.getDate())}/${date.getFullYear()} ${this.format12HourTime(date)}`;
    }
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private getDurationHMS(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${this.pad(hours)} hr ${this.pad(minutes)} min ${this.pad(seconds)} sec`;
  }

  private getDurationMS(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes} : ${this.pad(seconds)}`;
  }

  private format12HourTime(date: Date): string {
    const hours = date.getHours();
    const minutes = this.pad(date.getMinutes());
    const seconds = this.pad(date.getSeconds());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert 0 to 12
    return `${this.pad(hour12)}:${minutes}:${seconds} ${ampm}`;
  }

}
