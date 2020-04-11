import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, firestore, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {users} from './user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public isLoggedIn=true;
 public userobs: Observable<users>;
 private userDetails: firebase.User = null;
  
  constructor(private afAuth: AngularFireAuth,private afs:AngularFirestore,private router:Router) { 
    this.userobs = this.afAuth.authState.pipe(switchMap(user=>{
      if(user){
        return this.afs.doc<users>(`Users/${user.uid}`).valueChanges();
      }
      else{
        return of(null);
      }
    }));
  }


  // Sign in with Google
 async GoogleAuth() {
    const credauth=await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return this.updateuserdata(credauth.user);
  }  

  updateuserdata({uid,email,displayName,photoURL}:User){
  const userref:AngularFirestoreDocument<users>=this.afs.doc(`Users/${uid}`);
  const data={uid,email,displayName,photoURL}
  return userref.set(data,{merge:true});
  }
  async Logout(){
 //this.isLoggedIn=false;
 //this.afAuth.authState.subscribe(data=>{console.log(data)});
  await this.afAuth.auth.signOut().then(() => {
  this.router.navigate(['/login']);
  }).catch(function(error) {
      console.log(error)
    });
  }
}
