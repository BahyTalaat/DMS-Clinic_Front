import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainController } from 'src/app/APIs/Main';
import { AddAppointmentDto } from 'src/app/Models/AddAppointmentDto';
import { QueryParamsDto, ResponseDto } from 'src/app/Models/Common/Response';
import { GetDoctorDto } from 'src/app/Models/GetDoctor';
import { GetSlotsDto } from 'src/app/Models/GetSlotsDto';
import { GetWorkingDayDto } from 'src/app/Models/GetWorkingDayDto';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-secretary-dashboard',
  templateUrl: './secretary-dashboard.component.html',
  styleUrls: ['./secretary-dashboard.component.scss']
})
export class SecretaryDashboardComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  // _doctorList: { id: number, name: string }[] = [{ id: 1, name: "bahy" }, { id: 2, name: "mena" }];

  _doctorList:GetDoctorDto[]=[];
  getAllDoctor() {
    let params: QueryParamsDto[] = [
      {
        key:"ClinicId" , value:1
      }
    ]
    this._httpService.GET(MainController.GetClinicAllDoctors,params).subscribe({
      next:((res:ResponseDto)=>{
        if(!res.isError){
          this._doctorList=res.serverParams['DoctorList'];
        }
      })
    })
  }

  _doctorDayList:GetWorkingDayDto[]=[];
  GetDoctorWorkingDays(){
    console.log("Enter");
    let params: QueryParamsDto[] = [
      {
        key:"DoctorId" , value:this.getDoctor().value
      }
    ]
    this._httpService.GET(MainController.GetDoctorWorkingDays,params).subscribe({
      next:((res:ResponseDto)=>{
        if(!res.isError){
          this._doctorDayList=res.serverParams['WorkingDayList'];
        }
      })
    })
  }

  _TimeList:GetSlotsDto[]=[];
  getTimeSlots(){
    let params: QueryParamsDto[] = [
      {
        key:"WorkingDayId" , value:this.getDate().value
      }
    ]
    this._httpService.GET(MainController.GetDoctorWorkingDaySlots,params).subscribe({
      next:((res:ResponseDto)=>{
        if(!res.isError){
          this._TimeList=res.serverParams['DaySlotsList'];
        }
      })
    })
  }

  AddAppointmentForm = new FormGroup({

    doctorId: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    timeSlotId: new FormControl('', [Validators.required]),
    patientName: new FormControl('', [Validators.required]),
    patientAddress: new FormControl('', [Validators.required]),
    patientAge: new FormControl('', [Validators.required]),
    patientBirthdate: new FormControl('', [Validators.required]),

  })

  getPatientAddress() {
    return this.AddAppointmentForm.controls['patientAddress'];
  }
  getPatientAge() {
    return this.AddAppointmentForm.controls['patientAge'];
  }

  getPatientBirthdate() {
    return this.AddAppointmentForm.controls['patientBirthdate'];
  }
  getTime() {
    return this.AddAppointmentForm.controls['timeSlotId'];
  }
  getDate() {
    return this.AddAppointmentForm.controls['date'];
  }
  getDoctor() {
    return this.AddAppointmentForm.controls['doctorId'];
  }
  getPatientName() {
    return this.AddAppointmentForm.controls['patientName'];
  }
  

  // _TimeList: { id: number, Time: string }[] = [{ id: 1, Time: "4:00" }, { id: 2, Time: "4:30" }, { id: 3, Time: "5:00" }]
  ngOnInit(): void {
    this.getAllDoctor();
  }
  submit() {
   let _date= this._doctorDayList.find(x=>x.id == parseInt(this.getDate().value!))
      let _addAppointmentDto:AddAppointmentDto={
        patientName:this.getPatientName().value!,
        patientBirthDate:this.getPatientBirthdate().value!,
        patientAddress:this.getPatientAddress().value!,
        patientAge:parseInt(this.getPatientAge().value!),
        date:_date?.date!,
        clinicId:1,
        doctorId:parseInt(this.getDoctor().value!),
        daySlotId:parseInt(this.getTime().value!)
      }
      this._httpService.POST(MainController.AddAppointment,_addAppointmentDto).subscribe({
        next:((res:ResponseDto)=>{
          if(!res.isError){
            console.log(res);
            this.AddAppointmentForm.reset();
          }
        }),
        error:((err)=>{
          console.log(err);
        })
      })
  }
}
