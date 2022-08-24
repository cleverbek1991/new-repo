import { Component, forwardRef, OnInit } from '@angular/core';

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
  FormBuilder,
} from '@angular/forms';
import { combineLatestWith, map } from 'rxjs/operators';

@Component({
  selector: 'sum-input',
  template: `
    <form [formGroup]="sumForm">
      <input type="number" formControlName="value_a" />
      <input type="number" formControlName="value_b" />
      <input type="number" formControlName="value_sum"  readonly />
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SumInputComponent),
      multi: true,
    },
  ],
})
export class SumInputComponent implements OnInit, ControlValueAccessor {
  constructor(private fb: FormBuilder) {}

  sumForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.getValues();
  }

  buildForm() {
    const value_a = this.fb.control(2);
    const value_b = this.fb.control(0);
    const value_sum = this.fb.control(value_a.value + value_b.value);

    this.sumForm = this.fb.group({ value_a, value_b, value_sum });
  }

  getValues() {
    // this.value_a.valueChanges
    //   .pipe(
    //     combineLatestWith(this.value_b.valueChanges),
    //     map(([a, b]) => a + b)
    //   )
    //   .subscribe((value) => {
    //     this.writeValue(value);
    //     this.onTouched();
    //     this.registerOnChange(this.onTouched);
    //   });

    this.value_a.valueChanges.subscribe((value) => {
      this.value_sum.setValue(value + this.value_b.value);
    });

    this.value_b.valueChanges.subscribe((value) => {
      this.value_sum.setValue(value + this.value_a.value);
    });
  }

  get value_sum(): AbstractControl {
    return this.sumForm.get('value_sum');
  }

  get value_a(): AbstractControl {
    return this.sumForm.get('value_a');
  }

  get value_b(): AbstractControl {
    return this.sumForm.get('value_b');
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.value_sum.setValue(val, { emitEvent: true });
  }
  registerOnChange(fn: any): void {
    // console.log('on change');
    this.value_sum.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }
}
