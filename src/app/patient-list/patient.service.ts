import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientSummary } from './patient.model';

/**
 * Stands in for the backend. Seeded so the list has content
 * on a fresh page load. Swap the method bodies for HttpClient
 * calls when the API exists.
 */
@Injectable({ providedIn: 'root' })
export class PatientService {
  private patients: PatientSummary[] = [
    {
      patientId: 5001,
      mrn: 'PC-2026-005001',
      firstName: 'Aarav',
      lastName: 'Sharma',
      dateOfBirth: '2019-04-12',
      gender: 'Male',
      guardianName: 'Ananya Sharma',
      guardianMobile: '9830012345',
      lastVisit: '2026-07-18',
    },
    {
      patientId: 5002,
      mrn: 'PC-2026-005002',
      firstName: 'Diya',
      lastName: 'Sharma',
      dateOfBirth: '2022-11-03',
      gender: 'Female',
      guardianName: 'Ananya Sharma',
      guardianMobile: '9830012345',
      lastVisit: null,
    },
    {
      patientId: 5003,
      mrn: 'PC-2026-005003',
      firstName: 'Kabir',
      lastName: 'Roy',
      dateOfBirth: '2016-01-25',
      gender: 'Male',
      guardianName: 'Sourav Roy',
      guardianMobile: '9007765432',
      lastVisit: '2026-08-02',
    },
    {
      patientId: 5004,
      mrn: 'PC-2026-005004',
      firstName: 'Ishani',
      lastName: 'Das',
      dateOfBirth: '2024-06-30',
      gender: 'Female',
      guardianName: 'Priyanka Das',
      guardianMobile: '9163398877',
      lastVisit: '2026-08-21',
    },
    {
      patientId: 5005,
      mrn: 'PC-2026-005005',
      firstName: 'Vivaan',
      lastName: 'Mehta',
      dateOfBirth: '2013-09-14',
      gender: 'Male',
      guardianName: 'Rohit Mehta',
      guardianMobile: '9836654321',
      lastVisit: '2026-05-09',
    },
    {
      patientId: 5006,
      mrn: 'PC-2026-005006',
      firstName: 'Anaya',
      lastName: 'Ghosh',
      dateOfBirth: '2021-02-08',
      gender: 'Female',
      guardianName: 'Moumita Ghosh',
      guardianMobile: '9051122334',
      lastVisit: null,
    },
  ];

  getPatients(): Observable<PatientSummary[]> {
    return of([...this.patients]);
  }

  getPatientByMrn(mrn: string): Observable<PatientSummary | undefined> {
    return of(this.patients.find((p) => p.mrn === mrn));
  }
}