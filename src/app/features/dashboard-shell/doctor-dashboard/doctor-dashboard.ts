import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { Header } from '../../../shared/ui/header/header';
import { PatientsService } from '../../../core/services/patients.service';
import { Material } from '../../../shared/ui/material';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Patient } from '../../../shared/models/patients.model';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [Header, ...Material, IconDirective, FormsModule, DatePipe],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.scss',
})
export class DoctorDashboard implements OnInit {
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);

  patientCards = viewChildren<ElementRef>('patientCards');

  showPagination = signal<boolean>(true);
  filteredPatients = computed(() => {
    const term = this.searchText().toLowerCase();

    if (!term) return this.allPatients();

    return this.allPatients().filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.id.toString().toLowerCase().includes(term) ||
        p.condition.toLowerCase().includes(term),
    );
  });
  pagedPatients = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredPatients().slice(start, end);
  });
  allPatients = signal<Patient[]>([]);

  totalPatients = computed(() => this.allPatients().length);

  today = new Date();
  searchText = signal<string>('');
  pageSize = signal(20);
  pageIndex = signal(0);
  pageSizeOptions = signal([20, 50, 100, 150, 200]);
  showPageSizeOptions = signal(true);
  showFirstLastButtons = signal(true);
  disabled = signal(false);
  hidePageSize = signal(false);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      if (!this.showPagination()) {
        this.setupIntersectionObserver();
      }
    });
  }

  ngOnInit(): void {
    this.allPatients.set(this.route.snapshot.data['patients']);

    this.patientsService.loadPatients().subscribe((patients) => {
      this.allPatients.set(patients);
    });
  }

  setShowPagination(value: boolean) {
    this.showPagination.set(value);
    if (!value) {
      this.pageIndex.set(0);
      this.pageSize.set(20);
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadMoreRecords();
      }
    });

    const patientCardsArray = this.patientCards();
    const lastEl = patientCardsArray[patientCardsArray.length - 1]?.nativeElement;

    observer.observe(lastEl);
  }

  loadMoreRecords() {
    this.isLoading.set(true);
    const size = 20;
    setTimeout(() => {
      this.pageSize.update((s: number) => s + size);
      this.isLoading.set(false);
    }, 2000);
  }

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

  handlePageEvent(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  filterPatients(event: string) {
    this.searchText.set(event);
    this.pageIndex.set(0);
  }
}
