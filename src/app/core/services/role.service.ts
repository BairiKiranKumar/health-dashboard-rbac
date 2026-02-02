import { Injectable, signal } from '@angular/core';
import { UserRole } from '../../shared/models/roles.model';

const STORAGE_KEY = 'app_role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private role = signal<UserRole | null>(this.loadRole());
  readonly role$ = this.role.asReadonly();

  private loadRole(): UserRole | null {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  }

  setRole(role: UserRole) {
    this.role.set(role);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(role));
  }

  clearRole() {
    this.role.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  hasRole(): boolean {
    return this.role() !== null;
  }
}
