import { Component } from '@angular/core';
import{PatientRegisterComponent}  from './patient-register/patient-register';
@Component({
  selector: 'app-root',
  standalone: true,
  imports:[PatientRegisterComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'pedia-centre';
}