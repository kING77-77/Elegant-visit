import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wedding-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wedding-invitation.html',
  styleUrl: './wedding-invitation.css'
})
export class WeddingInvitationComponent implements OnInit, AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  // Customizable wedding data
  protected readonly brideName = 'Isabella';
  protected readonly groomName = 'Alexander';
  protected readonly weddingDate = '24.08.2026';
  protected readonly weddingDateFormatted = 'Saturday, August 24, 2026';

  protected readonly ceremonyTime = '16:00';
  protected readonly ceremonyLocation = 'St. Nicholas Church';
  protected readonly ceremonyAddress = 'Grand Avenue 42, City Center';

  protected readonly receptionTime = '18:30';
  protected readonly receptionLocation = 'Villa Grand Resort';
  protected readonly receptionAddress = 'Royal Park Road 108, Lake Side';

  protected readonly dressCodeSwatches = [
    { name: 'Nude', color: '#F3E9DF', border: '#e2d4c3' },
    { name: 'Champagne', color: '#E6D7C3', border: '#d8c5ad' },
    { name: 'Warm Taupe', color: '#B8A99A', border: '#a39383' },
    { name: 'Soft Rose', color: '#E4C5C4', border: '#d5b3b2' },
    { name: 'Sage Green', color: '#9EAB9C', border: '#8b9a89' }
  ];

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngAfterViewInit(): void {
    this.setupScrollObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    const animatedElements = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    animatedElements.forEach((element: HTMLElement) => {
      this.observer?.observe(element);
    });
  }
}
