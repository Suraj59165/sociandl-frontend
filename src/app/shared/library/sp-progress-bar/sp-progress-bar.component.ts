import {Component} from '@angular/core';
import {SpProgressBarService} from '../../services/sp-progress-bar-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sp-progress-bar',
  standalone: false,
  templateUrl: './sp-progress-bar.component.html',
  styleUrl: './sp-progress-bar.component.css'
})
export class SpProgressBarComponent {
  progress$: Observable<boolean>;

  constructor(private progressBarService: SpProgressBarService) {
    this.progress$ = this.progressBarService.progress$;
  }
}
