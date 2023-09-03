import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  selectedEmployee: Employee = { id: 0, firstname: '', lastname: '', birthdate: new Date(), address: { id: 0, city: '', zip: '', street: '', number: '' }, phone: '' };
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }
  onSave(employeeForm: any): void {
    if (this.selectedEmployee.id) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee)
        .subscribe(() => {
          const index = this.employees.findIndex(emp => emp.id === this.selectedEmployee.id);
          this.employees[index] = this.selectedEmployee;
          this.resetSelectedEmployee();
          employeeForm.reset();
          this.getEmployees();
        });
    } else {
      this.employeeService.addEmployee(this.selectedEmployee)
        .subscribe(employee => {
          this.employees.push(employee);
          this.resetSelectedEmployee();
          employeeForm.reset();
          this.getEmployees();
        });
    }
  }

  onEdit(id: number, updatedEmployee: Employee): void {
    this.selectedEmployee = { ...updatedEmployee };
  }

  onDelete(id: number): void {
    this.employeeService.deleteEmployee(id)
      .subscribe(() => {
        this.employees = this.employees.filter(employee => employee.id !== id);
        this.getEmployees();
      });
  }

  private resetSelectedEmployee(): void {
    this.selectedEmployee = { id: 0, firstname: '', lastname: '', birthdate: new Date(), address: { id: 0, city: '', zip: '', street: '', number: '' }, phone: '' };
  }
}
