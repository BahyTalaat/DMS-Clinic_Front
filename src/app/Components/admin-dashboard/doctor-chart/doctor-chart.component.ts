import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { MainController } from 'src/app/APIs/Main';
import { ResponseDto } from 'src/app/Models/Common/Response';
import { PatientPerDoctor } from 'src/app/Models/PatientPerDoctor';
import { HttpService } from 'src/app/Service/http.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-doctor-chart',
  templateUrl: './doctor-chart.component.html',
  styleUrls: ['./doctor-chart.component.scss']
})
export class DoctorChartComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private _httpService:HttpService) {
    this.chartOptions = {
      series: [
        {
          name: "Patient Number",
          data: this._countlist
        }
      ],
      chart: {
        height: 400,
        type: "bar"
      },
      title: {
        text: "Patients Per every Doctor"
      },
      xaxis: {
        categories: this._doctorNamelist
      }
    };
  }

_countlist:number[]=[];
_doctorNamelist:string[]=[];
  getLists(){
    this._PatientPerDoctor.forEach(x=>{
      this._countlist.push(x.patientCount);
      this._doctorNamelist.push(x.doctorName);
    })
  }


  _PatientPerDoctor:PatientPerDoctor[]=[];
  getPatientPerDoctor(){
    this._httpService.GET(MainController.NumberOfPatientPerDoctor).subscribe({
      next:((res:ResponseDto)=>{
        if(!res.isError){
          console.log(res);
          this._PatientPerDoctor=res.serverParams['PatientCountPerDoctor'];
          this.getLists();
        }
      })
    })
  }
  ngOnInit(): void {

    this.getPatientPerDoctor();
  }

}
