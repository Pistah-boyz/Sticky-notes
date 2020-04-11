import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TaskserviceService } from '../taskservice.service';
import { tasks } from '../tasks.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  visible = true;     
  selectable = true;
importance="";
  addOnBlur = true;
  myForm: FormGroup;

  constructor(public fb: FormBuilder,private serviceobj:TaskserviceService,private router:Router) {}

  ngOnInit(): void {
    this.reactiveForm();
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      title:['',[Validators.required]],
      description: ['', [Validators.required]],
      importance: [''],
      duedate: ['', [Validators.required]]
    })
  }

  /* Date */
    date(e) {
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
      this.myForm.get('duedate').setValue(convertDate, {
        onlyself: true
      })
    }
/* Handle form errors in Angular 8 */
public errorHandling = (control: string, error: string) => {
  return this.myForm.controls[control].hasError(error);
}
  submitForm() {
    console.log(this.myForm.value);
    this.serviceobj.addTask(this.myForm.value);
    console.log("tasks added");
    this.router.navigate(['/tasks']);
  }

}
