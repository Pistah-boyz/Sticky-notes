import { Component, OnInit } from '@angular/core';
import { tasks } from '../tasks.model';
import { Observable } from 'rxjs';
import { TaskserviceService } from '../taskservice.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { isNull } from 'util';

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
      taskId:[''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      importance: ['',[Validators.required]],
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
    this.serviceobj.updatetask(this.myForm.value);
    // if(this.myForm.value.taskId!=null)
    // {
    //   this.serviceobj.updatetask(this.myForm.value);
    // }
    // else{
    //   this.serviceobj.addTask(this.myForm.value);
    // }
    console.log("tasks added");
    this.myForm.reset();
    this.router.navigate(['/tasks']);
  }
  deleteItem(task) {
    //Get the task id
    console.log(task.taskId);
    
    //delete the task 
    this.serviceobj.deleteTask(task);
    console.log("deleted");
  } //deleteTask
  
  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  editform(task){
    let taskdate=this.convertDate(task.duedate.toString());
    this.myForm = this.fb.group({
      taskId:[task.taskId],
      title: [task.title],
      description: [task.description],
      importance: [task.importance],
      duedate: [taskdate]
    });
    console.log(this.myForm.value);
  }
}
