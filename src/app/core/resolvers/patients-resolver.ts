import { ResolveFn } from '@angular/router';
import { Patient } from '../../shared/models/patients.model';
import { finalize, from, of } from 'rxjs';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../services/role.service';
import { PatientsService } from '../services/patients.service';

export const patientsResolver: ResolveFn<Patient[] | null> = () => {
  const snackBar = inject(MatSnackBar);
  const roleService = inject(RoleService);
  const patientService = inject(PatientsService);

  if (roleService.role$() !== 'Doctor') {
    return of(null);
  }

  const snackRef = snackBar.open(
    'Dashboard will load in 5 seconds (simulating API response)',
    'Close',
    { duration: 5000 },
  );

  return from(patientService.loadPatientsPromise()).pipe(finalize(() => snackRef.dismiss()));
};
