import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { GuardianRegistration, ChildRegistration } from './registration.model';

const D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

export function verhoeffValid(digits: string): boolean {
  let c = 0;
  const reversed = digits.split('').reverse();
  for (let i = 0; i < reversed.length; i++) {
    c = D[c][P[i % 8][Number(reversed[i])]];
  }
  return c === 0;
}

export const passwordMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pwd && confirm && pwd !== confirm ? { passwordMismatch: true } : null;
};

export const childDob: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  const dob = new Date(control.value);
  if (isNaN(dob.getTime())) return { invalidDate: true };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dob > today) return { futureDate: true };

  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;

  return age >= 18 ? { notPaediatric: true } : null;
};

export const abhaId: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const raw = (control.value ?? '').toString().replace(/[\s-]/g, '');
  if (!raw) return null;
  if (!/^\d{14}$/.test(raw)) return { abhaFormat: true };
  return verhoeffValid(raw) ? null : { abhaChecksum: true };
};

export const aadhaar: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const raw = (control.value ?? '').toString().replace(/[\s-]/g, '');
  if (!raw) return null;
  if (!/^\d{12}$/.test(raw)) return { aadhaarFormat: true };
  if (raw[0] === '0' || raw[0] === '1') return { aadhaarFormat: true };
  return verhoeffValid(raw) ? null : { aadhaarChecksum: true };
};