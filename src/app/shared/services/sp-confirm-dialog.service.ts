import {Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SpConfirmDialogService {

  constructor(private confirmationService: ConfirmationService) {
  }

  confirm(options: {
    message: string,
    header?: string,
    icon?: string,
    acceptLabel?: string,
    rejectLabel?: string,
    acceptIcon?: string,
    rejectIcon?: string,
    key?: string,
    onAccept?: () => void,

  }) {
    this.confirmationService.confirm({
      key: options.key || 'global',
      message: options.message,
      header: options.header || 'Confirmation',
      icon: options.icon || 'pi pi-exclamation-triangle',
      acceptLabel: options.acceptLabel || 'Yes',
      rejectLabel: options.rejectLabel || 'No',
      acceptIcon: options.acceptIcon || 'pi pi-check',
      rejectIcon: options.rejectIcon || 'pi pi-times',
      accept: options.onAccept,
      reject: () => {
        this.confirmationService.close();  // Close the dialog directly
      }
    });
  }
}
