import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { Error404Component } from './error404/error404.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { RoutineComponent } from './routine/routine.component';
import { WorkoutComponent } from './workout/workout.component';
import { ProfileComponent } from './profile/profile.component';
import { WeightComponent } from './weight/weight.component';


const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AdminLayoutComponent },
  { path: '', component: LandingComponent },
  { path: '404', component: Error404Component },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'routine', component: RoutineComponent },
  { path: 'workout', component: WorkoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'weight', component: WeightComponent },
  // { path: 'landing', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
