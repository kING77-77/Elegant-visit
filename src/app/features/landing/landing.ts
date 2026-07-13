import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Template } from '../../core/models/types';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LocalizedPricePipe } from '../../core/pipes/localized-price.pipe';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, LocalizedPricePipe],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class LandingComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  readonly featuredTemplates = signal<Template[]>([]);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    this.apiService.getTemplates().subscribe({
      next: (data) => {
        // Take first 3 templates for featured display
        this.featuredTemplates.set(data.slice(0, 3));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
