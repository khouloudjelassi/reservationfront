import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  // { path: '**', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'seats/:date', component: SeatsComponent , canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent  , canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent  , canActivate: [AuthGuard] },
  {
    path: '',
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('../app/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
