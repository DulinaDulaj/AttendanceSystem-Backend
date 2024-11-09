import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  public student:any={
    nic:"",
    name:"",
    phone:"",
    email:"",
    age:""
  };
  
  constructor(private http:HttpClient){}

  public addStudent(){
    this.http.post("http://localhost:8080/student",this.student).subscribe((data)=>{
        alert("student Added!!!!");
        this.student.name="";
        this.student.nic="";
        this.student.phone="";
        this.student.email="";
        this.student.age="";
    })
  }
 
}
