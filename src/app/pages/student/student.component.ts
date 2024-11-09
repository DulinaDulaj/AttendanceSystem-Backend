import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  title = 'individual-project';

  public tempstudentList: any = []; 
  public studentList: any = [];      
  public studentTemp: any = {};   
  constructor(private http:HttpClient){
    this.loadTable();  
  }

  loadTable(){
    this.http.get("http://localhost:8080/student/get-students").subscribe(data=>{
      this.tempstudentList=data;
      this.studentList=data;
    })
  }
  
  updateStudent(student:any){
    this.studentTemp=student;
  }
  public saveStudent(){
    this.http.post("http://localhost:8080/student/update-student",this.studentTemp).subscribe((data)=>{
        alert("student updates!!!!");
        this.studentTemp.name="";
        this.studentTemp.nic="";
        this.studentTemp.phone="";
        this.studentTemp.email="";
        this.studentTemp.age="";
        this.loadTable();
    })
  }

  search: any ="";
  filterStudents(){
    

    if (this.search) {
      this.studentList = this.tempstudentList.filter((student: any) =>
        student.nic === this.search
      );
    } else {
      
      this.studentList = this.tempstudentList;
      this.loadTable();

    }
  }

  deleteStudent(nic:any){
    this.http.delete(`http://localhost:8080/student/delete-student/${nic}`).subscribe(data=>{
      this.loadTable();
      alert("Student Deleted Successfully!!!")
    })
  }
}
