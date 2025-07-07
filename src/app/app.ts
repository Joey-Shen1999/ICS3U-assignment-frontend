import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'ICS3U 作业';

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  isHomePage() {
    return this.router.url === '/';
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
