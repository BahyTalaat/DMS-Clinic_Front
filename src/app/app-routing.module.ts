import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ClinicComponent } from './Components/admin-dashboard/clinic/clinic.component';
import { DoctorChartComponent } from './Components/admin-dashboard/doctor-chart/doctor-chart.component';
import { DoctorListComponent } from './Components/admin-dashboard/doctor-list/doctor-list.component';
import { DoctorComponent } from './Components/admin-dashboard/doctor/doctor.component';
import { DoctorDashboardComponent } from './Components/doctor-dashboard/doctor-dashboard.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SecretaryDashboardComponent } from './Components/secretary-dashboard/secretary-dashboard.component';

const routes: Routes = [
  {path:"login",component:LogInComponent},
  {path:"SecretaryDashboard",component:SecretaryDashboardComponent},
  {path:"DoctorDashboard/:id",component:DoctorDashboardComponent},
  {path:"AdminDashboard",component:AdminDashboardComponent,
   children:[
    {path:"AddClinic",component:ClinicComponent},
    {path:"AddDoctor",component:DoctorComponent},
    {path:"Doctors",component:DoctorListComponent},
    {path:"DoctorsCharts",component:DoctorChartComponent},
    {path:"",component:ClinicComponent},
   ]},
  {path:"",component:LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
