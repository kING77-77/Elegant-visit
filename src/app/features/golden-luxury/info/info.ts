import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  template: `
    <section class="info-section">
      <div class="glass-panel text-center scroll-reveal">
        <h2 class="title-elegant text-gold mb-6">Մեր հարսանիքը</h2>
        
        <div class="calendar-wrapper mt-8">
          <h3 class="calendar-title text-gold mb-4">Հունիս 2026</h3>
          <div class="calendar-grid">
            <div class="day-name">Երկ</div>
            <div class="day-name">Երք</div>
            <div class="day-name">Չրք</div>
            <div class="day-name">Հնգ</div>
            <div class="day-name">Ուրբ</div>
            <div class="day-name">Շբթ</div>
            <div class="day-name">Կիր</div>
            
            @for (day of days; track day) {
              <div class="day" [class.wedding-day]="day === 27">
                {{ day }}
                @if (day === 27) {
                  <span class="heart-mark">❤️</span>
                }
              </div>
            }
          </div>
        </div>

        <div class="wedding-timeline mt-12">
          <div class="timeline-item scroll-reveal delay-2">
            <div class="timeline-dot"></div>
            <div class="timeline-content left-side">
              <div class="timeline-time text-gold">13։30</div>
              <h4>Պսակադրություն</h4>
              <p class="text-muted">Խոր վիրապ</p>
            </div>
          </div>

          <div class="timeline-item scroll-reveal delay-4">
            <div class="timeline-dot"></div>
            <div class="timeline-content left-side">
              <div class="timeline-time text-gold">17:30</div>
              <h4>Հարսանեկան խնջույք</h4>
              <p class="text-muted">Ռեստորան "Արքայաձոր", հասցե՝Մյասնիկյան պող.32</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .info-section {
      position: relative;
      background: radial-gradient(circle at center, rgba(20,20,25,1) 0%, var(--gl-color-bg-dark, #0a0a0c) 100%);
    }
    
    .mb-6 { margin-bottom: 2rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mt-8 { margin-top: 3rem; }
    .mt-12 { margin-top: 5rem; }
    .text-muted { color: var(--gl-color-text-muted, rgba(255, 255, 255, 0.7)); font-size: 0.9rem; }

    /* Calendar */
    .calendar-wrapper {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 15px;
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(212,175,55,0.1);
    }
    .calendar-title {
      font-family: var(--gl-font-serif, 'Cormorant Garamond', serif);
      font-size: 1.5rem;
      letter-spacing: 0.1em;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
      font-family: var(--gl-font-sans, 'Montserrat', sans-serif);
      font-size: 0.9rem;
    }
    .day-name {
      color: var(--gl-color-gold-light, #f3e5ab);
      font-weight: 500;
      font-size: 0.8rem;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .day {
      padding: 5px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      position: relative;
      transition: all 0.3s ease;
    }
    .day:hover:not(.wedding-day) {
      background: rgba(255,255,255,0.1);
    }
    .wedding-day {
      background: rgba(212,175,55,0.2);
      border: 1px solid var(--gl-color-gold, #d4af37);
      color: var(--gl-color-gold-light, #f3e5ab);
      box-shadow: 0 0 15px rgba(212,175,55,0.3);
      transform: scale(1.1);
      z-index: 2;
    }
    .heart-mark {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 0.8rem;
      animation: float 2s infinite ease-in-out;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    /* Timeline */
    .wedding-timeline {
      position: relative;
      max-width: 800px;
      margin: 4rem auto 0;
    }
    .wedding-timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background: linear-gradient(to bottom, transparent, var(--gl-color-gold, #d4af37), transparent);
      transform: translateX(-50%);
    }
    .timeline-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      position: relative;
      width: 100%;
    }
    .timeline-dot {
      width: 12px;
      height: 12px;
      background: var(--gl-color-gold, #d4af37);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px var(--gl-color-gold, #d4af37);
      z-index: 2;
    }
    .timeline-content {
      width: 45%;
      padding: 1.5rem;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 10px;
      transition: var(--gl-transition-smooth, 0.8s cubic-bezier(0.25, 1, 0.5, 1));
    }
    .timeline-content:hover {
      background: rgba(255,255,255,0.05);
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      border-color: rgba(212,175,55,0.3);
    }
    .timeline-time {
      font-family: var(--gl-font-serif, 'Cormorant Garamond', serif);
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .timeline-content h4 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .left-side {
      text-align: right;
    }
    
    @media (max-width: 768px) {
      .wedding-timeline::before {
        left: 20px;
      }
      .timeline-dot {
        left: 20px;
      }
      .timeline-content {
        width: calc(100% - 50px);
        margin-left: 50px !important;
        text-align: left !important;
      }
    }
    
    @media (max-width: 480px) {
      .calendar-wrapper {
        padding: 1rem 0.75rem;
      }
      .calendar-grid {
        gap: 4px;
        font-size: 0.8rem;
      }
      .day-name {
        font-size: 0.65rem;
        margin-bottom: 5px;
      }
      .day {
        padding: 2px;
      }
      .wedding-day {
        transform: scale(1.05);
      }
      .heart-mark {
        font-size: 0.65rem;
        top: -6px;
        right: -6px;
      }
    }
    
    /* Scroll Reveal */
    .scroll-reveal {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
      filter: blur(10px);
      transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .scroll-reveal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
    .delay-2 { transition-delay: 0.2s; }
    .delay-4 { transition-delay: 0.4s; }
  `]
})
export class Info implements OnInit {
  readonly days = Array.from({length: 30}, (_, i) => i + 1);

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupScrollAnimation();
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    setTimeout(() => {
      const elements = this.el.nativeElement.querySelectorAll('.scroll-reveal');
      elements.forEach((el: Element) => observer.observe(el));
    }, 100);
  }
}
