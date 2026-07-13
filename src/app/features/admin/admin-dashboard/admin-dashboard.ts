import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { DashboardStats } from '../../../core/models/types';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  
  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading.set(true);
    this.apiService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  // Helper to extract keys of event type dictionary
  getEventKeys(): string[] {
    const dist = this.stats()?.eventDistribution;
    return dist ? Object.keys(dist) : [];
  }
}
