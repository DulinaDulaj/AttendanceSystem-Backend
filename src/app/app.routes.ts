import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentComponent } from './pages/student/student.component';
import { AddStudentComponent } from './pages/student/add-student/add-student.component';
import { CourseComponent } from './pages/course/course.component';
import { AddCourseComponent } from './pages/course/add-course/add-course.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { MarkAttendanceComponent } from './pages/attendance/mark-attendance/mark-attendance.component';

export const routes: Routes = [
    { path: '', redirectTo: 'app-dashboard', pathMatch: 'full' }, 
    { path: 'app-dashboard', component:DashboardComponent  },
    {
        path:"app-student",
        component:StudentComponent
    },
    {
        path:"app-student/app-add-student",
        component:AddStudentComponent
    },
    {
        path:"app-course",
        component:CourseComponent
    },
    {
        path:"app-course/app-add-course",
        component:AddCourseComponent
    },
    {
        path:"app-attendance",
        component:AttendanceComponent
    },
    {
        path:"app-attendance/app-mark-attendance",
        component:MarkAttendanceComponent
    }
];
