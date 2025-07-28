import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'spNumberFormat'  // No need for `standalone` here
})
export class SpNumberFormatPipe implements PipeTransform {

  transform(value: number | string, decimalPlaces: number = 2): string {
    const number = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(number)) {
      return '';
    }
    return number?.toFixed(decimalPlaces);  // Format number to the specified decimal places
  }

}
