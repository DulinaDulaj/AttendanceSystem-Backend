import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  public course:any={
    c_code:"",
    c_name:"",
    description:""
  };
  
  constructor(private http:HttpClient){}

  public addCourse(){
    this.http.post("http://localhost:8080/course",this.course).subscribe((data)=>{
        alert("course Added!!!!");
        this.course.c_name="";
        this.course.c_code="";
        this.course.description="";
       
    })
  }
}
