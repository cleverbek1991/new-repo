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

import { startWith, pairwise } from 'rxjs/operators';

@Component({
  selector: 'p-input',
  template: `
  <form [formGroup]="pInputForm">
    <div class="row">
      <label for="pnumberid"> Percentage Input </label>
        <input id="pnumberid" type="text" formControlName="pnumber">
    </div>
  </form>
  `,
  styleUrls: ['./p-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PercentageInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PercentageInputComponent),
      multi: true,
    },
  ],
})
export class PercentageInputComponent
  implements OnInit, ControlValueAccessor, Validator
{
  pInputForm: FormGroup = new FormGroup({
    pnumber: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit() {
    this.pInputForm
      .get('pnumber')
      .valueChanges.pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        if (next) {
          if (isNaN(+next) || next[next.length - 1] === '.' || next[next.length - 1] === ' ') {
            this.pInputForm.setValue({ pnumber: prev });
          }
        }
      });
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.pInputForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    // console.log('on change');
    this.pInputForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.pInputForm.disable() : this.pInputForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    // console.log('Custom Input validation', c);
    return this.pInputForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'pInputForm fields are invalid',
          },
        };
  }
}
