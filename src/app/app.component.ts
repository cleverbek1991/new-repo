import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public nestedForm: FormGroup = new FormGroup({
    cinput: new FormControl(''),
    currencyInput: new FormControl(''),
    pInput: new FormControl(''),
    radio: new FormControl(''),
    sumInput: new FormControl(0),
  });
  constructor() {}

  ngOnInit() {}

  public onSubmit() {
    console.log('Val', this.nestedForm.value);
  }
}
