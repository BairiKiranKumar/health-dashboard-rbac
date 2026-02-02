import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { IconDirective } from '../../directives/icon.directive';
import { RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'header',
  imports: [MatButtonModule, IconDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  role = input<string>('');
  private roleService = inject(RoleService);
  private router = inject(Router);

  subHeading = computed<string>(() => {
    return this.role() === 'doctor'
      ? 'Patient Management System'
      : 'Appointment & Reception Management';
  });

  onSwitchRoleClick() {
    this.roleService.clearRole();
    this.router.navigate(['/']);
  }
}
