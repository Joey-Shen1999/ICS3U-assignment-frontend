import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  fullName = '';
  email = '';
  msg = '';
  msgColor = 'red';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    this.msg = '';
    this.http.post('http://localhost:8080/api/students/register', {
      username: this.username,
      password: this.password,
      fullName: this.fullName,
      email: this.email
    }).subscribe({
      next: _ => {
        this.msgColor = 'green';
        this.msg = '注册成功，正在跳转...';
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: (err: HttpErrorResponse) => {
        this.msgColor = 'red';
        if (err.status === 400) {
          this.msg = typeof err.error === 'string' ? err.error : '注册信息有误';
        } else {
          this.msg = '网络错误，请重试';
        }
      }
    });
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }
}
