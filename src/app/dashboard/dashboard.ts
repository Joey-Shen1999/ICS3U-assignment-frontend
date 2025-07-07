import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  user: any = null;
  assignments: any[] = [];

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    if (this.user && this.user.id) {
      // 查询该 owner（登录用户）的 assignment
      this.http.get<any[]>(`http://localhost:8080/api/assignments/owner/${this.user.id}`)
        .subscribe({
          next: data => this.assignments = data,
          error: err => this.assignments = []
        });
    }
  }

  openAssignment(a: any) {
    this.router.navigate(['/assignment', a.id]);
  }
}
