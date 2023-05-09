import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlaySpinnerComponent implements AfterViewInit {
  @Input() show: boolean|any = false;
  @Input() diameter: number = 100;
  constructor() { }

  ngAfterViewInit(): void {
  }

}
