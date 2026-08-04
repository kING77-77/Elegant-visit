import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hero } from './hero/hero';
import { Info } from './info/info';
import { Countdown } from './countdown/countdown';
import { CouplePhoto } from './couple-photo/couple-photo';
import { Rsvp } from './rsvp/rsvp';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-minimalism',
  standalone: true,
  imports: [CommonModule, RouterModule, Hero, Info, Countdown, CouplePhoto, Rsvp, Footer],
  templateUrl: './minimalism.html',
  styleUrls: ['./minimalism.css', './styles.css']
})
export class MinimalismComponent {}
