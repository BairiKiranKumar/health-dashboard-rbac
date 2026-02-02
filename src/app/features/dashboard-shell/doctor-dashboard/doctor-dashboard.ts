import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../shared/ui/header/header';
import { PatientsService } from '../../../core/services/patients.service';
import { Material } from '../../../shared/ui/material';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [Header, ...Material, IconDirective, FormsModule, DatePipe, NgClass],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.scss',
})
export class DoctorDashboard {
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);

  showPagination = signal<boolean>(true);
  searchText: string = '';
  filteredPatients = this.route.snapshot.data['patients'];

  today = new Date();

  getLastVisitDays(lastVisit: string) {
    const lastVisitDate = new Date(lastVisit);
    const diffTime = this.today.getTime() - lastVisitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getPatientStatus(status: string) {
    const statusClass =
      status === 'Active'
        ? 'bg-green-100 text-green-800'
        : status === 'Inactive'
          ? 'bg-gray-100 text-gray-800'
          : 'bg-red-100 text-red-800';
    return statusClass;
  }
}
