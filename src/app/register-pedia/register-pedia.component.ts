import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

const passwordMatch = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
};

const childDob = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { invalidDate: true };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date > today ? { futureDate: true } : null;
};

const abhaIdValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  const normalized = value.replace(/[\s-]/g, '');
  return /^[0-9]{14}$/.test(normalized) ? null : { invalidAbhaId: true };
};

const aadhaarValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  const normalized = value.replace(/[\s-]/g, '');
  return /^[0-9]{12}$/.test(normalized) ? null : { invalidAadhaar: true };
};

@Component({
  selector: 'app-register-pedia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-pedia.component.html',
  styleUrl: './register-pedia.component.scss',
})
export class RegisterPediaComponent {
  private fb = inject(FormBuilder);

  submitted = false;
  otpSent = false;
  otpVerified = false;

  readonly relationships = ['Mother', 'Father', 'Legal guardian', 'Other'];
  readonly languages = ['English', 'Hindi', 'Bengali'];
  readonly states = ['West Bengal', 'Maharashtra', 'Karnataka', 'Delhi', 'Telangana', 'Uttar Pradesh'];
  readonly genders = ['Male', 'Female', 'Other'];
  readonly bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  readonly immunization = ['Up to date', 'Partial', 'Not sure'];

  private readonly nameRules = [
    Validators.required,
    Validators.maxLength(50),
    Validators.pattern(/^[A-Za-z' -]+$/),
  ];

  form: FormGroup = this.fb.group(
    {
      firstName: ['', this.nameRules],
      lastName: ['', this.nameRules],
      relationshipToChild: ['', [Validators.required, Validators.maxLength(20)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)],
      ],
      confirmPassword: ['', Validators.required],
      addressLine1: ['', [Validators.required, Validators.maxLength(100)]],
      addressLine2: ['', Validators.maxLength(100)],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      preferredLanguage: ['', Validators.maxLength(20)],
      termsAccepted: [false, Validators.requiredTrue],
      healthDataConsent: [false, Validators.requiredTrue],
      children: this.fb.array([this.newChild()]),
    },
    { validators: passwordMatch }
  );
constructor() {
  this.form.valueChanges.subscribe((value) => {
    console.log('Form value:', value);
    console.log('Valid:', this.form.valid);
  });
}
  newChild(): FormGroup {
    return this.fb.group({
      firstName: ['', this.nameRules],
      lastName: ['', this.nameRules],
      dateOfBirth: ['', [Validators.required, childDob]],
      gender: ['', [Validators.required, Validators.maxLength(10)]],
      abhaId: ['', abhaIdValidator],
      aadhaarNumber: ['', aadhaarValidator],
      bloodGroup: ['', Validators.maxLength(3)],
      knownAllergies: ['', Validators.maxLength(255)],
      existingConditions: ['', Validators.maxLength(500)],
      currentMedications: ['', Validators.maxLength(255)],
      immunizationStatus: ['', Validators.maxLength(15)],
      referredBy: ['', Validators.maxLength(100)],
    });
  }

  get children(): FormArray {
    return this.form.get('children') as FormArray;
  }

  childGroup(i: number): FormGroup {
    return this.children.at(i) as FormGroup;
  }

  addChild(): void {
    this.children.push(this.newChild());
  }

  removeChild(i: number): void {
    if (this.children.length > 1) this.children.removeAt(i);
  }

  invalid(path: string): boolean {
    const c = this.form.get(path);
    return !!c && c.invalid && (c.touched || this.submitted);
  }

  err(path: string, key: string): boolean {
    return !!this.form.get(path)?.errors?.[key];
  }

  sendOtp(): void {
    const mobile = this.form.get('mobileNumber');
    if (mobile?.invalid) {
      mobile.markAsTouched();
      return;
    }
    this.otpSent = true;
  }

  verifyOtp(): void {
    const otp = this.form.get('otp');
    if (otp?.invalid) {
      otp.markAsTouched();
      return;
    }
    this.otpVerified = true;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid || !this.otpVerified) {
      this.form.markAllAsTouched();
      setTimeout(() => {
        const first = document.querySelector('.is-invalid') as HTMLElement | null;
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        first?.focus();
      });
      return;
    }

    const { confirmPassword, otp, ...raw } = this.form.value;

    const payload = {
      ...raw,
      email: raw.email || null,
      addressLine2: raw.addressLine2 || null,
      preferredLanguage: raw.preferredLanguage || null,
      children: raw.children.map((c: Record<string, string>) => ({
        ...c,
        abhaId: c['abhaId'] ? c['abhaId'].replace(/[\s-]/g, '') : null,
        aadhaarNumber: c['aadhaarNumber'] ? c['aadhaarNumber'].replace(/[\s-]/g, '') : null,
        bloodGroup: c['bloodGroup'] || null,
        knownAllergies: c['knownAllergies'] || null,
        existingConditions: c['existingConditions'] || null,
        currentMedications: c['currentMedications'] || null,
        immunizationStatus: c['immunizationStatus'] || null,
        referredBy: c['referredBy'] || null,
      })),
    };

    console.log('POST /api/v1/registration', payload);
  }
}