import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="overlay" *ngIf="isLoading$ | async">
  <div class="lds-heart"><div></div></div>
  </div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  isLoading$ = this.spinnerSvc.isLoading$;

  constructor(private spinnerSvc: SpinnerService) { }

  ngOnInit(): void {
  }

}
