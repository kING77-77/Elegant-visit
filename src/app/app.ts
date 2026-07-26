import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from './core/services/translation.service';
import { TranslatePipe } from './core/pipes/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('rsvp-frontend');
  private readonly router = inject(Router);
  public readonly translationService = inject(TranslationService);


  readonly showPublicLayout = signal<boolean>(true);
  readonly searchQuery = signal<string>('');
  readonly isDarkTheme = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);

  ngOnInit(): void {
    // Synchronize initial theme setting from localStorage
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme.set(savedTheme === 'dark');
    this.applyTheme();

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.closeMobileMenu();
      const url = event.urlAfterRedirects || event.url;
      const isStandalone = url.startsWith('/admin') || url.startsWith('/wedding-invitation') || url.startsWith('/invitation');
      this.showPublicLayout.set(!isStandalone);
      
      // Update searchQuery signal if search query param exists in current URL
      try {
        const urlObj = new URL(window.location.origin + url);
        const searchParam = urlObj.searchParams.get('search');
        this.searchQuery.set(searchParam || '');
      } catch (e) {
        this.searchQuery.set('');
      }
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    const nextTheme = !this.isDarkTheme();
    this.isDarkTheme.set(nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkTheme()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  triggerSearch(): void {
    this.router.navigate(['/catalog'], {
      queryParams: { search: this.searchQuery() || null },
      queryParamsHandling: 'merge'
    });
  }
}

