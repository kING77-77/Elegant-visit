import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Category, Template } from '../../core/models/types';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LocalizedPricePipe } from '../../core/pipes/localized-price.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe, LocalizedPricePipe],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class CatalogComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly categories = signal<Category[]>([]);
  readonly templates = signal<Template[]>([]);
  readonly selectedCategoryId = signal<number | null>(null);
  readonly searchQuery = signal<string>('');
  readonly loading = signal<boolean>(true);

  private readonly searchSubject = new Subject<string>();

  ngOnInit(): void {
    // Check if category, categoryName, or search is passed in URL query params
    this.route.queryParams.subscribe(params => {
      const catId = params['category'];
      const catName = params['categoryName'];
      const searchVal = params['search'];

      if (searchVal !== undefined) {
        this.searchQuery.set(searchVal || '');
      }

      this.loading.set(true);

      // Chain load categories first to map name query to exact ID
      this.apiService.getCategories().subscribe({
        next: (categories) => {
          this.categories.set(categories);

          if (catId) {
            this.selectedCategoryId.set(Number(catId));
          } else if (catName) {
            const nameLower = catName.toLowerCase();
            const matched = categories.find(c => 
              c.name.toLowerCase().includes(nameLower)
            );
            if (matched) {
              this.selectedCategoryId.set(matched.id);
            } else if (nameLower === 'другое' || nameLower === 'другие') {
              const matchedOther = categories.find(c => 
                c.name.toLowerCase().includes('друг') || 
                c.name.toLowerCase().includes('other')
              );
              this.selectedCategoryId.set(matchedOther ? matchedOther.id : null);
            } else {
              this.selectedCategoryId.set(null);
            }
          } else {
            this.selectedCategoryId.set(null);
          }

          this.loadTemplates();
        },
        error: () => {
          this.loading.set(false);
        }
      });
    });

    // Handle search query debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery.set(query);
      this.loadTemplates();
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      }
    });
  }

  loadTemplates(): void {
    this.loading.set(true);
    this.apiService.getTemplates(this.selectedCategoryId(), this.searchQuery()).subscribe({
      next: (data) => {
        this.templates.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId.set(categoryId);
    // Keep URL parameter updated
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryId, categoryName: null },
      queryParamsHandling: 'merge'
    });
    this.loadTemplates();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }
}

