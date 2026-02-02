import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Patient } from '../../shared/models/patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private http = inject(HttpClient);
  private url = 'assets/data/patient-data.json';

  loadPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url).pipe(
      catchError((error) => {
        console.error('Error fetching patients:', error);
        return of([]);
      }),
    );
  }

  getPatients(start: number, end: number): Observable<Patient[]> {
    return this.loadPatients().pipe(map((patients: Patient[]) => patients.slice(start - 1, end)));
  }

  async loadPatientsPromise(): Promise<Patient[]> {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      return await firstValueFrom(this.getPatients(1, 20));
    } catch (error) {
      console.error('Error fetching patients:', error);
      return [];
    }
  }
}
