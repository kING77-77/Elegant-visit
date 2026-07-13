import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AdminDto } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://localhost:5137/api/auth';

  // Signals for state management
  readonly currentUser = signal<AdminDto | null>(null);
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    this.loadSession();
  }

  login(username: string, password: string): Observable<AdminDto> {
    return this.http.post<AdminDto>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(user => {
        this.saveSession(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('rsvp_admin_user');
    this.currentUser.set(null);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  private saveSession(user: AdminDto): void {
    localStorage.setItem('rsvp_admin_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  private loadSession(): void {
    const stored = localStorage.getItem('rsvp_admin_user');
    if (stored) {
      try {
        const user = JSON.parse(stored) as AdminDto;
        this.currentUser.set(user);
      } catch (e) {
        localStorage.removeItem('rsvp_admin_user');
      }
    }
  }
}
