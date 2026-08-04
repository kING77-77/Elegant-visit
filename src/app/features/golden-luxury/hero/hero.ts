import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero-section" #heroSection>
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content fade-in text-center">
        <h3 class="subtitle-elegant reveal">Հրավիրում ենք բոլորիդ մեր հարսանյաց արարողությանը</h3>
        <h1 class="title-elegant text-gold mt-4 reveal delay-1">Արամ և Էլեն</h1>

        <button class="play-btn reveal delay-3 mt-4" (click)="scrollDown()" aria-label="Scroll down">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .hero-section {
      position: relative;
      width: 100%;
      height: 100vh;
      height: 100dvh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: var(--gl-color-bg-dark, #0a0a0c);
      margin: 0;
      padding: 0;
    }
    .hero-bg {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('/assets/images/background.png') center center / cover no-repeat;
      z-index: 1;
      opacity: 0.85;
      animation: slowZoom 20s ease-in-out infinite alternate;
      width: 100%;
      height: 100%;
    }
    .hero-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(to bottom, rgba(10,10,12,0.2) 0%, rgba(10,10,12,0.85) 100%);
      z-index: 2;
    }
    .hero-content {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      width: 100%;
      max-width: 700px;
    }
    .delay-1 { transition-delay: 0.3s; animation-delay: 0.3s; }
    .delay-2 { transition-delay: 0.6s; animation-delay: 0.6s; }
    .delay-3 { transition-delay: 1.2s; animation-delay: 1.2s; }
    
    @keyframes slowZoom {
      0% { transform: scale(1.0); }
      100% { transform: scale(1.1); }
    }
    
    .play-btn {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      cursor: pointer;
      padding: 0;
      transition: all 0.3s ease;
      margin-top: 1.5rem;
      animation: pulseBtn 2s infinite;
      -webkit-tap-highlight-color: transparent;
    }
    @keyframes pulseBtn {
      0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
      70% { box-shadow: 0 0 0 20px rgba(212,175,55,0); }
      100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
    }
    .play-btn:hover, .play-btn:active {
      background: var(--gl-color-gold, #d4af37);
      color: var(--gl-color-bg-dark, #0a0a0c);
      transform: scale(1.1);
    }
    
    .scroll-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
      opacity: 0.7;
    }
    .scroll-text {
      font-family: var(--gl-font-sans, 'Montserrat', sans-serif);
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .scroll-line {
      width: 1px;
      height: 50px;
      background: linear-gradient(to bottom, var(--gl-color-gold, #d4af37), transparent);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      51% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }
    
    .mt-4 { margin-top: 0.75rem; }
    .mt-8 { margin-top: 2rem; }

    @media (max-width: 480px) {
      .hero-content {
        gap: 0.75rem;
        padding: 1rem;
      }
      .play-btn {
        width: 56px;
        height: 56px;
        font-size: 1.2rem;
      }
      .scroll-line {
        height: 40px;
      }
    }
  `]
})
export class Hero implements OnInit {
  ngOnInit() {
    this.setVh();
    window.addEventListener('resize', () => this.setVh());

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);
  }

  setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    if (heroSection) {
      heroSection.style.height = `${window.innerHeight}px`;
    }
  }

  scrollDown() {
    const infoSection = document.querySelector('app-info');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
