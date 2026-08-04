import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section class="rsvp-section" id="rsvp">
      <div class="glass-panel text-center scroll-reveal" style="max-width: 600px; width: 90%;">
        <h2 class="title-elegant text-gold mb-2" style="font-size: clamp(2rem, 4vw, 3rem);">Հարցաթերթիկ</h2>
     
        <p class="text-muted mb-8" style="font-size: 0.9rem; line-height: 1.6;">
          Խնդրում ենք հաստատել Ձեր ներկայությունը մինչև օգոստոսի 18   -ը: <br/>
        </p>

        <form (submit)="send($event)" class="rsvp-form">
          <div class="radio-group mb-6">
            <label class="radio-label">
              <input type="radio" name="come" value="yes" [(ngModel)]="come">
              <span class="custom-radio"></span>
              <div class="radio-text">
                Կարող եմ գալ<br>
              </div>
            </label>
            <label class="radio-label">
              <input type="radio" name="come" value="no" [(ngModel)]="come">
              <span class="custom-radio"></span>
              <div class="radio-text">
                Չեմ կարող գալ<br>
              </div>
            </label>
          </div>

          <div class="input-group">
            <input type="text" placeholder="Անուն" [(ngModel)]="name" name="name" required />
            <div class="input-focus-border"></div>
          </div>
          
          <div class="input-group">
            <input type="text" placeholder="Ազգանուն" [(ngModel)]="surname" name="surname" required />
            <div class="input-focus-border"></div>
          </div>
          
          <div class="input-group">
            <input type="number" placeholder="Հյուրերի քանակ" [(ngModel)]="guests" name="guests" min="1" max="10" />
            <div class="input-focus-border"></div>
          </div>

          <button type="submit" class="mt-8 submit-btn" [disabled]="isSending || successMessage">
            <span class="btn-text" [class.hidden]="isSending || successMessage">Ուղարկել</span>
            @if (isSending) {
              <span class="btn-text">Ուղարկվում է...</span>
            }
            @if (successMessage) {
              <span class="btn-text text-gold"><i class="fa-solid fa-check"></i> Շնորհակալություն</span>
            }
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .rsvp-section {
      position: relative;
      background: radial-gradient(circle at top, rgba(30,25,10,0.3) 0%, var(--gl-color-bg-dark, #0a0a0c) 100%);
    }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-6 { margin-bottom: 2rem; }
    .mb-8 { margin-bottom: 3rem; }
    .mt-8 { margin-top: 2rem; }
    .text-muted { color: rgba(255,255,255,0.6); }
    
    .rsvp-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* Custom Radio */
    .radio-group {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .radio-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      position: relative;
    }
    .radio-label input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    .custom-radio {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      position: relative;
      transition: all 0.3s ease;
    }
    .radio-label:hover .custom-radio {
      border-color: var(--gl-color-gold-light, #f3e5ab);
    }
    .radio-label input:checked ~ .custom-radio {
      border-color: var(--gl-color-gold, #d4af37);
    }
    .custom-radio::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 12px; height: 12px;
      border-radius: 50%;
      background: var(--gl-color-gold, #d4af37);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .radio-label input:checked ~ .custom-radio::after {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 10px var(--gl-color-gold, #d4af37);
    }
    .radio-text {
      text-align: left;
      font-family: var(--gl-font-sans, 'Montserrat', sans-serif);
      font-size: 0.9rem;
    }

    /* Inputs */
    .input-group {
      position: relative;
      width: 100%;
    }
    .input-focus-border {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      width: 0;
      height: 1px;
      background: var(--gl-color-gold, #d4af37);
      transition: all 0.4s ease;
      transform: translateX(-50%);
      pointer-events: none;
    }
    input:focus ~ .input-focus-border {
      width: calc(100% - 3rem);
      box-shadow: 0 0 10px rgba(212,175,55,0.5);
    }

    /* Button */
    .submit-btn {
      width: 100%;
      position: relative;
    }
    .submit-btn:disabled {
      cursor: not-allowed;
      border-color: rgba(255,255,255,0.2);
    }
    .hidden { display: none; }

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
export class Rsvp implements OnInit {
  TOKEN = '8606764083:AAGzKLI501D6qyxbZ2uz0oeCtUKfo5oVpU4';
  ID = '1887985880';
  come: string = 'yes';
  name: string = '';
  surname: string = '';
  guests: number = 1;
  
  isSending: boolean = false;
  successMessage: boolean = false;

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
    }, { threshold: 0.2 });

    setTimeout(() => {
      const elements = this.el.nativeElement.querySelectorAll('.scroll-reveal');
      elements.forEach((el: Element) => observer.observe(el));
    }, 100);
  }

  send(event: Event) {
    event.preventDefault();
    if (!this.name || !this.surname) return;
    
    this.isSending = true;

    const status = this.come === 'yes' ? '✅ Կարող է գալ' : '❌ Չի կարող գալ';
    const guestsCount = this.come === 'yes' ? ` ${this.guests}` : '—';
    
    const message = ` <b>Նոր պատասխան հրավերին </b>\n\n` +
                    ` <b>Անուն Ազգանուն </b> ${this.name} ${this.surname}\n` +
                    ` <b>Կարգավիճակ </b> ${status}\n` +
                    ` <b>Հյուրեր </b> ${guestsCount}`;

    fetch(`https://api.telegram.org/bot${this.TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: this.ID,
        text: message,
        parse_mode: 'HTML'
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Telegram API responded with an error');
      }
      return response.json();
    })
    .then(() => {
      this.isSending = false;
      this.successMessage = true;
      
      this.name = '';
      this.surname = '';
      this.guests = 1;
      alert("Շնորհակալություն");
    })
    .catch(err => {
      console.error('Error sending RSVP via Telegram:', err);
      this.isSending = false;
      alert('Ուղարկման սխալ: Խնդրում ենք կրկին փորձել:');
    });
  }
}
