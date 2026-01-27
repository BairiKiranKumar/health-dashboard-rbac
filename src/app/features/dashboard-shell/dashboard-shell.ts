import { Component, inject } from '@angular/core';
import { RoleService } from '../../shared/services/role.service';
import { DoctorDashboard } from './doctor-dashboard/doctor-dashboard';
import { ReceptionistDashboard } from './receptionist-dashboard/receptionist-dashboard';

@Component({
  selector: 'app-dashboard-shell',
  imports: [DoctorDashboard, ReceptionistDashboard],
  templateUrl: './dashboard-shell.html',
  styleUrl: './dashboard-shell.scss',
})
export class DashboardShell {
  private roleService = inject(RoleService);
  role$ = this.roleService.role$;
}
