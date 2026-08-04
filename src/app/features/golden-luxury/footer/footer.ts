import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-section">
      <div class="footer-bg"></div>
      <div class="footer-overlay"></div>
      <div class="footer-content text-center">
        <h2 class="title-elegant text-gold mb-4" style="font-size: clamp(1.5rem, 5vw, 2rem);">Սպասում ենք Ձեզ</h2>
        
        <div class="divider"></div>
        
        <p class="couple-names">Արամ և Էլեն</p>
        <p class="wedding-date">21 . 08. 2026</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer-section {
      background: var(--gl-color-bg-dark, #0a0a0c);
      padding: 6rem 2rem 4rem;
      position: relative;
      overflow: hidden;
    }
    
    .footer-bg {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('/assets/images/footer.jpg') center/cover no-repeat;
      z-index: 1;
      opacity: 1;
    }
    
    .footer-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(to bottom, var(--gl-color-bg-dark, #0a0a0c) 0%, rgba(10,10,12,0.5) 30%, rgba(10,10,12,0.2) 100%);
      z-index: 2;
    }
    
    .footer-content {
      position: relative;
      z-index: 3;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .mb-4 { margin-bottom: 1rem; }
    
    .divider {
      width: 1px;
      height: 80px;
      background: linear-gradient(to bottom, transparent, var(--gl-color-gold, #d4af37), transparent);
      margin: 3rem 0;
    }
    
    .couple-names {
      font-family: var(--gl-font-serif, 'Cormorant Garamond', serif);
      font-size: 1.5rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gl-color-gold-light, #f3e5ab);
      margin-bottom: 0.5rem;
    }
    
    .wedding-date {
      font-family: var(--gl-font-sans, 'Montserrat', sans-serif);
      font-size: 0.8rem;
      letter-spacing: 0.5em;
      color: rgba(255,255,255,0.5);
    }
  `]
})
export class Footer {}
