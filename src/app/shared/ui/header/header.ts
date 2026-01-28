import { Component, inject, input } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { IconDirective } from '../../directives/icon.directive';

@Component({
  selector: 'header',
  imports: [MatButtonModule, IconDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  subHeading = input<string>('');
  private roleService = inject(RoleService);
  private router = inject(Router);

  onSwitchRoleClick() {
    this.roleService.clearRole();
    this.router.navigate(['/']);
  }
}
