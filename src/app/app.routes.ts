import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { Register } from './register/register'

export const routes: Routes = [
  { path: '', component: App },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'assignment/:id', component: AssignmentDetail },
  { path: 'register', component: Register },
  // 其它页面...
];
