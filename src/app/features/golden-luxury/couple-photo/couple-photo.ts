import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-couple-photo',
  standalone: true,
  template: `
    <section class="couple-section">
      <div class="photo-container scroll-reveal">
        <div class="photo-frame">
          <div class="photo-inner" #parallaxImg></div>
        </div>
        <div class="photo-decoration top-left"></div>
        <div class="photo-decoration bottom-right"></div>
      </div>
      <div class="quote-container scroll-reveal delay-2 mt-8 text-center">
        <p class="quote-text text-gold">Ձեզ հետ բերեք ՍԵՐ, ժպիտներ ու անսահման դրական էմոցիաներ:</p>
      </div>
    </section>
  `,
  styles: [`
    .couple-section {
      background: var(--gl-color-bg-dark, #0a0a0c);
      position: relative;
    }
    
    .photo-container {
      position: relative;
      width: 80vw;
      max-width: 600px;
      aspect-ratio: 3/4;
      margin: 0 auto;
    }
    
    .photo-frame {
      width: 100%;
      height: 100%;
      border-radius: 200px 200px 10px 10px;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(212,175,55,0.3);
      box-shadow: 0 30px 60px rgba(0,0,0,0.6);
      background: var(--gl-color-bg-dark, #0a0a0c);
    }
    
    .photo-inner {
      width: 100%;
      height: 120%; /* for parallax */
      background: url('/assets/images/footer.jpg') center/cover no-repeat;
      position: absolute;
      top: -10%;
      transition: transform 0.1s linear;
    }
    
    .photo-decoration {
      position: absolute;
      width: 150px;
      height: 150px;
      border: 2px solid var(--gl-color-gold, #d4af37);
      opacity: 0.3;
      z-index: 0;
    }
    .photo-decoration.top-left {
      top: -20px;
      left: -20px;
      border-right: none;
      border-bottom: none;
      border-radius: 200px 0 0 0;
    }
    .photo-decoration.bottom-right {
      bottom: -20px;
      right: -20px;
      border-left: none;
      border-top: none;
      border-radius: 0 0 10px 0;
    }
    
    .quote-container {
      max-width: 600px;
      padding: 0 2rem;
    }
    .quote-text {
      font-family: var(--gl-font-serif, 'Cormorant Garamond', serif);
      font-size: clamp(1.2rem, 5vw, 2rem);
      font-style: italic;
    }
    .mt-8 { margin-top: 4rem; }
    
    @media (max-width: 600px) {
      .photo-decoration {
        width: 100px;
        height: 100px;
      }
      .photo-decoration.top-left {
        top: -10px;
        left: -10px;
      }
      .photo-decoration.bottom-right {
        bottom: -10px;
        right: -10px;
      }
    }
    
    /* Scroll Reveal */
    .scroll-reveal {
      opacity: 0;
      transform: translateY(60px);
      filter: blur(10px);
      transition: all 1.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .scroll-reveal.visible {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
    .delay-2 { transition-delay: 0.3s; }
  `]
})
export class CouplePhoto implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupScrollAnimation();
    this.setupParallax();
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    setTimeout(() => {
      const elements = this.el.nativeElement.querySelectorAll('.scroll-reveal');
      elements.forEach((el: Element) => observer.observe(el));
    }, 100);
  }

  setupParallax() {
    window.addEventListener('scroll', () => {
      const img = this.el.nativeElement.querySelector('.photo-inner') as HTMLElement;
      const section = this.el.nativeElement.querySelector('.couple-section') as HTMLElement;
      
      if (img && section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const yPos = (scrollPercent * 20) - 10;
          img.style.transform = `translateY(${yPos}%)`;
        }
      }
    });
  }
}
