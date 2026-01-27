import { Component, inject } from '@angular/core';
import { IconDirective } from '../../shared/directives/icon.directive';
import { IconName } from '../../../assets/icon';
import { Material } from '../../shared/ui/material';
import { UserRole } from '../../shared/models/roles.model';
import { RoleService } from '../../shared/services/role.service';
import { Router } from '@angular/router';

type DashboardRole = {
  name: UserRole;
  icon: IconName;
  desc: string;
};

@Component({
  selector: 'app-role-selection',
  imports: [IconDirective, ...Material],
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.scss',
})
export class RoleSelection {
  private roleService = inject(RoleService);
  private router = inject(Router);

  roles: DashboardRole[] = [
    {
      name: 'Doctor',
      icon: 'stethoscope',
      desc: 'Access patients, appointments & prescriptions',
    },
    {
      name: 'Receptionist',
      icon: 'clipboard',
      desc: 'Manage appointments, patients check-ins',
    },
  ];

  onRoleSelect(role: DashboardRole) {
    this.roleService.setRole(role.name);
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
}
