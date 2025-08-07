import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

 setTheme(theme: 'light' | 'dark') {
  this.isDark = theme === 'dark';
  document.body.className = this.isDark ? 'dark-theme' : '';
  localStorage.setItem('theme', theme);
}

  get currentTheme(): string {
    return this.isDark ? 'dark' : 'light';
  }
}
