import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: "", redirectTo: "/employees", pathMatch: "full" },
  { path: "**", redirectTo: "/employees" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
