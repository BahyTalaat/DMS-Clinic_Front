import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SecretaryDashboardComponent } from './Components/secretary-dashboard/secretary-dashboard.component';
import { DoctorDashboardComponent } from './Components/doctor-dashboard/doctor-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ClinicComponent } from './Components/admin-dashboard/clinic/clinic.component';
import { DoctorComponent } from './Components/admin-dashboard/doctor/doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorListComponent } from './Components/admin-dashboard/doctor-list/doctor-list.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DoctorChartComponent } from './Components/admin-dashboard/doctor-chart/doctor-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SecretaryDashboardComponent,
    DoctorDashboardComponent,
    AdminDashboardComponent,
    ClinicComponent,
    DoctorComponent,
    DoctorListComponent,
    DoctorChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
