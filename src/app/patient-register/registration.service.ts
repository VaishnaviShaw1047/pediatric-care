import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { GuardianRegistration } from './registration.model';

/**
 * Stands in for the backend until the API exists.
 * Every method returns an Observable, so swapping to HttpClient
 * later means changing only this file.
 */

export interface RegistrationResponse {
  guardianId: number;
  patients: { patientId: number; mrn: string }[];
  message: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private registered: GuardianRegistration[] = [];
  private nextGuardianId = 1001;
  private nextPatientId = 5001;

  register(payload: GuardianRegistration): Observable<RegistrationResponse> {
    // if (this.isMobileTaken(payload.mobileNumber)) {
    //   return throwError(() => ({
    //     status: 409,
    //     error: { message: 'This mobile number is already registered' },
    //   }));
    // }
    //for now mobile number can be duplicated
    

    this.registered.push(payload);

    return of({
      guardianId: this.nextGuardianId++,
      patients: payload.children.map(() => this.createPatientRecord()),
      message: 'Registration successful',
    });
  }

  private isMobileTaken(mobileNumber: string): boolean {
    return this.registered.some((g) => g.mobileNumber === mobileNumber);
  }

  private createPatientRecord(): { patientId: number; mrn: string } {
    const patientId = this.nextPatientId++;
    return {
      patientId,
      mrn: `PC-2026-${String(patientId).padStart(6, '0')}`,
    };
  }
}