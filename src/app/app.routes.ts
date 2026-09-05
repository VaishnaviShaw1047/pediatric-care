import { Routes } from '@angular/router';
import { PatientRegisterComponent } from './patient-register/patient-register';
import { PatientListComponent } from './patient-list/patient-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent },
  { path: 'register', component: PatientRegisterComponent },
];