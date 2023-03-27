import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  constructor() { }

  AddClinicForm= new FormGroup({
    
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),

  })
  
  getName(){
    return this.AddClinicForm.controls['name'];
  }
  getAddress(){
    return this.AddClinicForm.controls['address'];
  }
  
  _doctorList:{id:number,name:string}[]=[{id:1,name:"bahy"},{id:2,name:"mena"}];
  _TimeList:{id:number,Time:string}[]=[{id:1,Time:"4:00"},{id:2,Time:"4:30"},{id:3,Time:"5:00"}]
  ngOnInit(): void {
  }
  submit(){

  }

}
