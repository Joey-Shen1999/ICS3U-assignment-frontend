import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null;

  setUser(user: any) {
    this.user = user;
    // 存一份到 localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (this.user) return this.user;
    // 页面刷新后尝试从 localStorage 读
    const local = localStorage.getItem('user');
    if (local) {
      this.user = JSON.parse(local);
      return this.user;
    }
    return null;
  }

  isLoggedIn() {
    return !!this.getUser();
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
