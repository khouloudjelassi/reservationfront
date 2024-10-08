import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { SeatsComponent } from './components/seats/seats.component';

const routes: Routes = [
  {    path: '',
    redirectTo: 'login',
    pathMatch: 'full',},
  { path: 'login', component: LoginComponent },
  // { path: 'seats', component: SeatsComponent , canActivate: [AuthGuard] },
  { path: 'seats/:department/:room', component: SeatsComponent ,canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent  , canActivate: [AuthGuard] },
  { path: 'seats/:date', component: SeatsComponent , canActivate: [AuthGuard] },

  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'main',
  //       loadChildren: () =>
  //         import('../app/dashboard/dashboard.module').then(
  //           m => m.DashboardModule
  //         ),
  //       canActivate: [AuthGuard],
  //     },
  //   ]
  // }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
