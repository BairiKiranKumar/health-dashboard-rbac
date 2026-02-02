import { inject } from '@angular/core';
import { RoleService } from '../services/role.service';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  const hasRole = roleService.hasRole();

  console.log('=== ROLE GUARD TRIGGERED ===');
  console.log('Has role?', hasRole);
  console.log('Current role:', roleService.role$());

  if (!hasRole) {
    console.log('Blocking access, redirecting to home');
    router.navigate(['/']);
    return false;
  }

  console.log('Allowing access to dashboard');
  return true;
};
