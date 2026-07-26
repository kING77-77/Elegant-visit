import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { DashboardStats, TelegramStatus } from '../../../core/models/types';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  
  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal<boolean>(true);

  // Telegram status state
  readonly telegramStatus = signal<TelegramStatus | null>(null);
  readonly loadingTelegram = signal<boolean>(false);

  ngOnInit(): void {
    this.loadStats();
    this.loadTelegramStatus();
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

  loadTelegramStatus(): void {
    this.loadingTelegram.set(true);
    this.apiService.getTelegramStatus().subscribe({
      next: (status) => {
        this.telegramStatus.set(status);
        this.loadingTelegram.set(false);
      },
      error: () => {
        this.loadingTelegram.set(false);
      }
    });
  }

  connectTelegram(): void {
    this.loadingTelegram.set(true);
    this.apiService.getTelegramConnectLink().subscribe({
      next: (link) => {
        this.loadingTelegram.set(false);
        if (link && link.url) {
          window.open(link.url, '_blank');
        }
      },
      error: () => {
        this.loadingTelegram.set(false);
        alert('Не удалось сгенерировать ссылку для подключения Telegram.');
      }
    });
  }

  disconnectTelegram(): void {
    if (!confirm('Вы уверены, что хотите отключить Telegram? Уведомления о новых RSVP-ответах перестанут приходить.')) {
      return;
    }

    this.loadingTelegram.set(true);
    this.apiService.disconnectTelegram().subscribe({
      next: () => {
        this.loadTelegramStatus();
      },
      error: () => {
        this.loadingTelegram.set(false);
        alert('Не удалось отключить Telegram.');
      }
    });
  }

  // Helper to extract keys of event type dictionary
  getEventKeys(): string[] {
    const dist = this.stats()?.eventDistribution;
    return dist ? Object.keys(dist) : [];
  }
}
