import { Component, Input } from '@angular/core';

@Component({
  selector: 'truncated-text',
  templateUrl: 'truncated-text.html'
})
export class TruncatedTextComponent {
  @Input('text') text: string;
  @Input('limit') limit: number = 40;
  @Input('truncating') truncating;

  constructor() {
    console.log('Hello TruncatedTextComponent Component');
  }

}
