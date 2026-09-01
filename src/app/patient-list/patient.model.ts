export interface PatientSummary {
  patientId: number;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  guardianName: string;
  guardianMobile: string;
  lastVisit: string | null;
}