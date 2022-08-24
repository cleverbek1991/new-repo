import { Component, OnInit, forwardRef, Input } from '@angular/core';
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
  selector: 'radio-input',
  template: `
  <form [formGroup]="cRadioForm">
    <div class="row">
        <ng-content></ng-content>
        <input id="cRadioId" type="radio" name="cRadio" formControlName="cRadio" [value]="value">
    </div>
  </form>
  `,
  styleUrls: ['./c-radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CRadioComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CRadioComponent),
      multi: true,
    },
  ],
})
export class CRadioComponent
  implements OnInit, ControlValueAccessor, Validator
{
  cRadioForm: FormGroup;

  @Input() value: string;
  constructor() {}

  ngOnInit() {
    this.cRadioForm = new FormGroup({
      cRadio: new FormControl(''),
    });
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.cRadioForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    // console.log('on change');
    this.cRadioForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.cRadioForm.disable() : this.cRadioForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    // console.log('Custom Input validation', c);
    return this.cRadioForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'cRadioForm fields are invalid',
          },
        };
  }
}
