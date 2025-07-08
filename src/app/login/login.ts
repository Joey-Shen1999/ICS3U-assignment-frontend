import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // 路径按你的实际目录调整
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';
  loginLoading = false;
  loginError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService // 注入 AuthService
  ) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.loginLoading = true;
    this.loginError = false;
    this.http.post<any>(`${environment.apiUrl}/api/students/login`, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (result) => {
        this.loginLoading = false;
        if (result && result.id) {
          this.auth.setUser(result); // 保存完整用户对象
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = true;
        }
      },
      error: () => {
        this.loginLoading = false;
        this.loginError = true;
      }
    });
  }
}
