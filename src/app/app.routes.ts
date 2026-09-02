import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PatientRegisterComponent } from './patient-register/patient-register';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
      { path: 'register', component: PatientRegisterComponent },
      { path: 'patients', component: PatientListComponent },
      { path: 'doctors', component: DoctorListComponent },
    ],
  },
];