import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  template: `
    <section class="countdown-section">
      <div class="glass-panel text-center scroll-reveal">
        <h3 class="title-elegant text-gold mb-8" style="font-size: clamp(1.5rem, 3vw, 2.5rem);">Մինչև հարսանիքը մնացել է</h3>
        
        <div class="timer-container">
          <div class="timer-item">
            <div class="timer-value-wrapper">
              <span class="timer-value" [class.tick]="tickObj.days">{{format(days)}}</span>
            </div>
            <span class="timer-label">Օր</span>
          </div>
          
          <div class="timer-divider">:</div>
          
          <div class="timer-item">
            <div class="timer-value-wrapper">
              <span class="timer-value" [class.tick]="tickObj.hours">{{format(hours)}}</span>
            </div>
            <span class="timer-label">Ժամ</span>
          </div>
          
          <div class="timer-divider">:</div>
          
          <div class="timer-item">
            <div class="timer-value-wrapper">
              <span class="timer-value" [class.tick]="tickObj.minutes">{{format(minutes)}}</span>
            </div>
            <span class="timer-label">Րոպե</span>
          </div>
          
          <div class="timer-divider">:</div>
          
          <div class="timer-item">
            <div class="timer-value-wrapper">
              <span class="timer-value" [class.tick]="tickObj.seconds">{{format(seconds)}}</span>
            </div>
            <span class="timer-label">Վրկ</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .countdown-section {
      position: relative;
      background: radial-gradient(circle at bottom, rgba(30,25,10,0.5) 0%, var(--gl-color-bg-dark, #0a0a0c) 80%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .mb-8 { margin-bottom: 3rem; }
    
    .timer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .timer-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;
    }
    
    .timer-value-wrapper {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 12px;
      padding: 1.5rem 1rem;
      min-width: 100px;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .timer-value-wrapper::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 50%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent);
      pointer-events: none;
    }
    
    .timer-value {
      font-family: var(--gl-font-serif, 'Cormorant Garamond', serif);
      font-size: 3rem;
      color: var(--gl-color-gold, #d4af37);
      display: inline-block;
      line-height: 1;
    }
    
    .timer-value.tick {
      animation: flip 0.5s ease-out;
    }
    
    @keyframes flip {
      0% { transform: rotateX(90deg); opacity: 0; }
      100% { transform: rotateX(0); opacity: 1; }
    }
    
    .timer-label {
      font-family: var(--gl-font-sans, 'Montserrat', sans-serif);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--gl-color-text-muted, rgba(255, 255, 255, 0.7));
    }
    
    .timer-divider {
      font-family: var(--gl-font-serif, 'Cormorant Garamond', serif);
      font-size: 3rem;
      color: rgba(255,255,255,0.2);
      margin-top: -3rem;
    }
    
    @media (max-width: 600px) {
      .timer-value { font-size: 2rem; }
      .timer-value-wrapper { min-width: 70px; padding: 1rem 0.5rem; }
      .timer-divider { font-size: 2rem; margin-top: -2.5rem; }
      .timer-container { gap: 0.5rem; }
    }
    
    @media (max-width: 480px) {
      .timer-divider { display: none; }
      .timer-container { gap: 0.4rem; }
      .timer-value-wrapper { min-width: 62px; padding: 0.8rem 0.4rem; margin-bottom: 0.5rem; }
      .timer-value { font-size: 1.6rem; }
      .timer-label { font-size: 0.58rem; letter-spacing: 0.1em; }
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
  `]
})
export class Countdown implements OnInit, OnDestroy {
  targetDate = new Date('2026-08-21T13:00:00').getTime();
  days = 0; hours = 0; minutes = 0; seconds = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;
  
  tickObj = { days: false, hours: false, minutes: false, seconds: false };

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
    this.setupScrollAnimation();
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0;
      if (this.timerId) clearInterval(this.timerId);
      return;
    }

    const newDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    const newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.seconds !== newSeconds) this.triggerTick('seconds');
    if (this.minutes !== newMinutes) this.triggerTick('minutes');
    if (this.hours !== newHours) this.triggerTick('hours');
    if (this.days !== newDays) this.triggerTick('days');

    this.days = newDays;
    this.hours = newHours;
    this.minutes = newMinutes;
    this.seconds = newSeconds;
  }

  triggerTick(unit: 'days' | 'hours' | 'minutes' | 'seconds') {
    this.tickObj[unit] = true;
    setTimeout(() => { this.tickObj[unit] = false; }, 500);
  }

  format(val: number): string {
    return val < 10 ? `0${val}` : val.toString();
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = this.el.nativeElement.querySelectorAll('.scroll-reveal');
      elements.forEach((el: Element) => observer.observe(el));
    }, 100);
  }
}
