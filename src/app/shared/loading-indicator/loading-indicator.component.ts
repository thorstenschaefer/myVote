import { Component, Input, OnInit } from '@angular/core';

/**
 * Shows a loading information if the data is null.
 */
@Component({
  moduleId: module.id,
  selector: 'app-loading-indicator',
  templateUrl: 'loading-indicator.component.html'
})
export class LoadingIndicatorComponent implements OnInit {

  constructor() {}

  @Input() data: any;
  
  ngOnInit() {
  }

}
