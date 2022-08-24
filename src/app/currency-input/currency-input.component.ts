import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'currency-input',
  template: `
  <form [formGroup]="currencyInputForm">
    <div class="row">
      <label for="currencyId"> Currency Input </label>
        <input id="currencyId" type="number" formControlName="currencyInput">
    </div>
  </form>
  `,
  styleUrls: ['./currency-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent
  implements OnInit, ControlValueAccessor, Validator
{
  currencyInputForm: FormGroup = new FormGroup({
    currencyInput: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit() {}

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.currencyInputForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    // console.log('on change');
    this.currencyInputForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.currencyInputForm.disable()
      : this.currencyInputForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    // console.log('Custom Input validation', c);
    return this.currencyInputForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'currencyInputForm fields are invalid',
          },
        };
  }
}
