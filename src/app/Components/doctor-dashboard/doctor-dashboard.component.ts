import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainController } from 'src/app/APIs/Main';
import { AddWorkingDay } from 'src/app/Models/AddWorkingDay';
import { QueryParamsDto, ResponseDto } from 'src/app/Models/Common/Response';
import { GetAppointmentDto } from 'src/app/Models/GetAppointment';
import { GetAppointmentRangeDto } from 'src/app/Models/GetAppointmentRangeDto';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  @ViewChild('CloseBtn') CloseBtn!:ElementRef;



  DoctorId;
  constructor(private _httpService:HttpService,private _activatedRoute:ActivatedRoute) { 
    if(this._activatedRoute.snapshot.paramMap.get('id') != null)
    {
      this.DoctorId=this._activatedRoute.snapshot.paramMap.get('id');
    }
  }

  GetAppointmentForm=new FormGroup({
    dateFrom:new FormControl('',Validators.required),
    dateTo:new FormControl('',Validators.required),
    doctorId:new FormControl('')
  })

  getDateFrom(){
    return this.GetAppointmentForm.controls['dateFrom'];
  }
  getDateTo(){
    return this.GetAppointmentForm.controls['dateTo'];
  }

  ngOnInit(): void {
    this.getTodayAppointment();
  }
  _AppointmentList:GetAppointmentDto[]=[];
  getTodayAppointment(){
    let _params:QueryParamsDto[]=[{
      key:"DoctorId",value:this.DoctorId
    }];
   
    this._httpService.GET(MainController.GetTodayDoctorAppointment,_params).subscribe({
      next:((res:ResponseDto)=>{
        if(!res.isError){
          console.log(res.serverParams['AppointmentList']);
          this._AppointmentList=res.serverParams['AppointmentList'];
        }
      }),
      error:((err)=>{
        console.log(err);
      })
    })
  }

  
  GetAppointment(){
    let _getAppointmentRangeDto:GetAppointmentRangeDto={
      dateFrom:this.getDateFrom().value!,
      dateTo: this.getDateTo().value!,
      doctorId:this.DoctorId != null ? parseInt(this.DoctorId) : 0,
    }
    this._httpService.POST(MainController.GetDoctorAppointmentByDates,_getAppointmentRangeDto).subscribe({
      next:((res:ResponseDto)=>{
        console.log(res);
        this._AppointmentList=res.serverParams['AppointmentList'];
      }),
      error:((err)=>{
        console.log(console.error())
      })
    })
  }


  WorkingDayForm=new FormGroup({
    day:new FormControl(''),
    date:new FormControl('',Validators.required),
    from:new FormControl('',Validators.required),
    to:new FormControl('',Validators.required),
    doctorID:new FormControl(''),
  })

  _hourList:number[]=[0,1,2,3,4,5,6,7,8,9,10,11,
                      12,13,14,15,16,17,18,19,20,21,22,23]
  getDay(){
    return this.WorkingDayForm.controls['day']
  }
  getDate(){
    return this.WorkingDayForm.controls['date']
  }
  getFrom(){
    return this.WorkingDayForm.controls['from']
  }
  getTo(){
    return this.WorkingDayForm.controls['to']
  }

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
getDayName(dateString:string){
  var d = new Date(dateString);
  var dayName = this.days[d.getDay()];
  return dayName;
}


  AddWorkingDay(){
    let _AddWorkingDay:AddWorkingDay={
    date:this.getDate().value!,
    from:parseInt(this.getFrom().value!),
    to:parseInt(this.getTo().value!),
    day:this.getDayName(this.getDate().value!),
    doctorID:this.DoctorId != null ? parseInt(this.DoctorId) : 0
    }
    console.log(_AddWorkingDay);

    this._httpService.POST(MainController.AddWorkingDay,_AddWorkingDay).subscribe({
      next:((res:ResponseDto)=>{
        if(!res.isError){
          console.log(res);
          this.WorkingDayForm.reset();
          this.CloseBtn.nativeElement.click();
        }
      }),
      error:((err)=>{
        console.log(err);
      })
    })
  }

}
