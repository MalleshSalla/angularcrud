import { EmployeeModel } from './employee-dashboard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData!: any;
  employeeModel: EmployeeModel = new EmployeeModel();
  showAdd!: boolean;
  showUpdate !:boolean
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }
  postEmployeeDetails() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModel)
      .subscribe({
        next: (res) => {
          alert("Employee added succeessfully");
          let cancelRef = document.getElementById('cancel');
          cancelRef?.click();
          this.formValue.reset();
          this.getAllEmployee()
        },
        error: (err) => {
          alert("something went wrong")
        }
      })
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate=false;
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe({
        next: (res) => {
          this.employeeData = res;
        }
      })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe({
        next: (res) => {
          alert("Employee deleted succeddfully");
          this.getAllEmployee();
        }
      })
  }

  onEdit(row: any) {
    this.employeeModel.id = row.id;

    this.showAdd = false;
    this.showUpdate=true;

    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModel, this.employeeModel.id)
      .subscribe({
        next: (res) => {
          alert("Update successfully");
          let cancelRef = document.getElementById('cancel');
          cancelRef?.click();
          this.formValue.reset();
          this.getAllEmployee()
        }
      })
  }
}



