import {MessageService} from 'primeng/api';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {
  constructor(private messageService: MessageService) {
  }

  showToast(severity: 'success' | 'info' | 'warn' | 'error' = 'success', summary: string = '', detail?: string) {
    this.messageService.add({severity, summary});
  }
}
