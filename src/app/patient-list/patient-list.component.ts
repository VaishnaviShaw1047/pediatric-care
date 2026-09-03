import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PatientService } from './patient.service';
import { PatientSummary } from './patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent implements OnInit {
  private patientService = inject(PatientService);

  patients: PatientSummary[] = [];
  loading = false;
  searchTerm = '';

  ngOnInit(): void {
    this.loading = true;
    this.patientService.getPatients().subscribe({
      next: (list) => {
        this.patients = list;
        // this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get filtered(): PatientSummary[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.patients;

    return this.patients.filter(
      (p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(term) ||
        p.mrn.toLowerCase().includes(term) ||
        p.guardianMobile.includes(term)
    );
  }

  age(dateOfBirth: string): string {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (today.getDate() < dob.getDate()) months--;
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years < 2) return `${years * 12 + months} mo`;
    return `${years} yr`;
  }

  trackByMrn(_: number, patient: PatientSummary): string {
    return patient.mrn;
  }
}