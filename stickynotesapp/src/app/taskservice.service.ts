import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { tasks } from './tasks.model';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { users } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

 taskstodo:AngularFirestoreCollection<tasks>;
 userlist:AngularFirestoreCollection<users>;
 tasks:Observable<tasks[]>;
 taskDoc: AngularFirestoreDocument<tasks>;
 taskarray:tasks[];
 userLoggedIn:any;
 
  constructor(private readonly af:AngularFirestore,private afAuth: AngularFireAuth ) {
    
    this.taskstodo= this.af.doc(`Users/${afAuth.auth.currentUser.uid}`).collection<tasks>('taskstodo');
    this.tasks=this.taskstodo.valueChanges();

    this.tasks=this.taskstodo.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as tasks;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    //this.taskstodo=af.collection<tasks>('tasks');
    //this.tasks = this.taskstodo.valueChanges();
   }

   getTasks(){
    return this.tasks;
  }


   addTask(taskitem:tasks) {
    //Add the new task to the collection
    //this.taskstodo.add(taskitem);
    taskitem.duedate=new Date(taskitem.duedate);
    this.taskstodo.add(taskitem);
  }

  updatetask(taskitem:tasks){
    delete taskitem.id;
    return this.af.doc('taskstodo/'+taskitem.id).update(taskitem);
  }

  deleteTask(taskitem:tasks) {
    //Get the task id
    this.af.doc('taskstodo/'+taskitem.id).delete();
    //Delete the document
   } 
 
}
