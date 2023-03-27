import { Component, OnInit } from '@angular/core';
import { MainController } from 'src/app/APIs/Main';
import { ResponseDto } from 'src/app/Models/Common/Response';
import { GetDoctorDto } from 'src/app/Models/GetDoctor';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  constructor(private _httpService:HttpService) { }

  ngOnInit(): void {
    this.GetAllDoctors();
  }

  _doctorList:GetDoctorDto[]=[];
  GetAllDoctors(){
  this._httpService.GET(MainController.GetAllDoctors).subscribe({
    next:((res:ResponseDto)=>{
      if(!res.isError){
        console.log(res.serverParams);
        this._doctorList=res.serverParams['DoctorList'];
      }
    }),
    error:((err)=>{
      console.log(err);
    })
  })
  }

}
