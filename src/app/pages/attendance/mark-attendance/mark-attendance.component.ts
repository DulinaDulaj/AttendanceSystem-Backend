import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';

interface Student {
  id: number;
  name: string;
  nic: string;
}
interface Attendance {
  nic: string;
  name: string;
  course: string; 
  date: string;
}

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit{

  ngOnInit() {
    this.attendance.date = new Date().toISOString().split('T')[0];
  }

  
  attendance: Attendance = {
    nic:"",
    name:"",
    course:"",
    date:""
  };
  
  students: any[] = [];
  tempAttendance:Attendance[]=[];
  searchControl = new FormControl('');

  constructor(private http: HttpClient) {
    this.getCourses();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),  
        distinctUntilChanged(),  
        switchMap((nic) => {
          if (!nic) {
            return new Observable<Student[]>((observer) => {
              observer.next([]); 
              observer.complete();
            });
          }
          return this.searchStudents(nic);
        })  
      )
      .subscribe((students) => {
        this.students = students;  
      });
  }

  
  searchStudents(nic: string): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:8080/student/search/${nic}`);
  }

  selectStudent(student: Student): void {
    this.searchControl.setValue(student.nic);  
    this.students = [];
  }

  setName(student: Student): void {
    this.attendance.name= student.name;
    
  }

  public addAttendance() {
    this.http.post("http://localhost:8080/attendance/add-attendance", this.attendance).subscribe((data) => {
      alert("student Added!!!!");
    })
    this.tempAttendance.push({ nic: this.attendance.nic, name: this.attendance.name,course:this.attendance.course,date:this.attendance.date })
    console.log(this.attendance)
  }

  ngOnDestroy(): void {
   
    this.tempAttendance = [];
    
  }


  courses: any=[];

  getCourses(){
    this.http.get("http://localhost:8080/course/get-courses").subscribe(data=>{
      this.courses=data;
      
    })
  }
}
