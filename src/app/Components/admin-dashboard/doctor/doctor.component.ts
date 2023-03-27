import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicController } from 'src/app/APIs/Clinic';
import { MainController } from 'src/app/APIs/Main';
import { AddDoctorDto } from 'src/app/Models/AddDoctorDto';
import { ResponseDto } from 'src/app/Models/Common/Response';
import { GetClinicDto } from 'src/app/Models/GetClinicDto';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(private _httpService:HttpService) { }

  AddDoctorForm= new FormGroup({
    
    doctorName: new FormControl('', [Validators.required]),
    doctorSpeciality: new FormControl('', [Validators.required]),
    clinic: new FormControl('', [Validators.required]),
  })
  
  getDoctorName(){
    return this.AddDoctorForm.controls['doctorName'];
  }
  getDoctorSpeciality(){
    return this.AddDoctorForm.controls['doctorSpeciality'];
  }
  getClinic(){
    return this.AddDoctorForm.controls['clinic'];
  }
 

  // _clinicList:{id:number,name:string}[]=[{id:1,name:"Assuit Clinic"},{id:2,name:"Cairo Clinic"}];
  
  ngOnInit(): void {
     this.GetAllClinic();
  }

  _clinicList:GetClinicDto[]=[];
  GetAllClinic(){
    this._httpService.GET(ClinicController.getAll).subscribe({
      next:((res:ResponseDto)=>{
        console.log(res);
        if(!res.isError){
          console.log(res);
          this._clinicList=res.serverParams['ClinicList'];
          console.log(this._clinicList);
        }
      }),
      error:((err)=>{
        console.log(err);
      })
    })
  }

  submit(){

    let _doctor:AddDoctorDto={
      name:this.getDoctorName().value!,
      speciality:this.getDoctorSpeciality().value!,
      clinicID:this.getClinic().value != null ? parseInt(this.getClinic().value!) : 0 
    }
    // doctor.name=this.getDoctorName().value;
    this._httpService.POST(MainController.AddDoctor,_doctor).subscribe(
    {
      next:((res:ResponseDto)=>{
        if(!res.isError){
          console.log(res.serverParams);
          this.AddDoctorForm.reset();
        }

      }),
      error: ((err) => {
        console.log(err);
      })
    }
    );

  }


}
