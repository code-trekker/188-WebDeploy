import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTableModule} from "angular-6-datatable";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import {NgsRevealModule} from 'ngx-scrollreveal';
import { TagInputModule } from 'ngx-chips';



import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    LandingComponent,
    AdminLayoutComponent,
    Error404Component,
    ExerciseComponent,
    RoutineComponent,
    WorkoutComponent,
    ProfileComponent,
    WeightComponent,
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    NgbModule.forRoot(),
    DataTableModule,
    ScrollToModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    SweetAlert2Module.forRoot(),
    AnimateOnScrollModule.forRoot(),
    NgsRevealModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
