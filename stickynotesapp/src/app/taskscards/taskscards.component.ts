import { Component, OnInit } from '@angular/core';
import { tasks } from '../tasks.model';
import { Observable } from 'rxjs';
import { TaskserviceService } from '../taskservice.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-taskscards',
  templateUrl: './taskscards.component.html',
  styleUrls: ['./taskscards.component.scss']
})
export class TaskscardsComponent implements OnInit {

  taskitems: Observable<tasks[]>;
  tasksnapshot: any;
  visible = true;
  selectable = true;
  importance = "";
  addOnBlur = true;
  myForm: FormGroup;


  constructor(public fb: FormBuilder, private serviceobj: TaskserviceService, private authservice: AuthService, private router: Router) {

    //console.log(this.tasksnapshot);
    //this.taskstodo=af.collection<tasks>('tasks');
    //this.tasks = this.taskstodo.valueChanges();
  }

  getTasks() {
    this.taskitems = this.serviceobj.getTasks();
  }

  ngOnInit(): void {
    this.getTasks();
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      importance: [''],
      duedate: ['', [Validators.required]]
    })
  }
  signOut() {
    this.authservice.Logout();
    this.router.navigate(['/login']);
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
  deleteItem(task) {
    //Get the task id
    console.log(task);
    let taskId = task.id;
    console.log("deleted");
    //delete the task 
    this.serviceobj.deleteTask(task);
    console.log("deleted");
  } //deleteTask
}
