import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private audio = new Audio('assets/music/aram.mp3');

  constructor() {
    this.audio.loop = true;
  }

  scroll() {
    if (this.audio.paused) {
      this.audio.play().catch(error => console.error("Audio playback failed:", error));
    }
    
    document.getElementById('info')?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
