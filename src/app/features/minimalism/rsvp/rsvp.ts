import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TelegramService } from '../telegram';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css',
})
export class Rsvp {

  name = '';
  surname = '';
  come = '';
  guests: number | null = null;
  isSending = false;

  constructor(private telegram: TelegramService) {}

  send(e: Event) {
    e.preventDefault();

    if(this.name == '' || this.surname == '' || this.come == '') {
      alert('Խնդրում ենք լրացնել բոլոր դաշտերը! / Пожалуйста, заполните все поля!');
      return;
    }

    this.isSending = true; 

    setTimeout(() => {
      try {
        this.telegram.send({
          name: this.name,
          surname: this.surname,
          come: this.come,
          guests: this.guests
        });
        alert('Շնորհակալություն պատասխանի համար! / Спасибо за ответ!');
        
        this.name = '';
        this.surname = '';
        this.come = '';
        this.guests = null;
      } catch (err) {
        alert('Произошла ошибка / Սխալ տեղի ունեցավ');
      } finally {
        this.isSending = false;
      }
    }, 800);
  }
}
