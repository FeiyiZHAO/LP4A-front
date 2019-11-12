import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';

import { CounterDetailComponent }  from './counter-detail/counter-detail.component';

const routes: Routes = [
{    path: '',
    component: HomeComponent,
    pathMatch: 'full'
},
{    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
},

{     path: 'counter/:id', 
    component: CounterDetailComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


