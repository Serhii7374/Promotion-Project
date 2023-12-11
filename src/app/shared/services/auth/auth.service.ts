import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { AuthProvider, IUserData } from '../../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  socialMedia = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider()
  };
  private userSubject = new BehaviorSubject<IUserData | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router
  ) {
    this.loadUserFromLocalStorage();
  }

  signInWithSocialMedia(provider: AuthProvider): void {
    this.afAuth.signInWithPopup(this.socialMedia[provider])
      .then((userCredential ) => {
        const uid = userCredential.user?.uid ? userCredential.user?.uid : '';
        this.checkIfUserExist(uid)
          .then(userExists => {
            if (!userExists && userCredential.user?.email) {
              const newUser: IUserData = {
                email: userCredential.user!.email,
                uid,
                firstName: 'User',
                lastName: '',
                age: '',
                avatarUrl: ''
              };
              this.addNewUserToCollection(newUser);
            } else {
              this.getUserData(uid);
            }

          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserData(uid: string | undefined): void {
    this.afFirestore.collection('users').ref.where('uid', '==', uid).onSnapshot(
      snap => {
        snap.forEach(userRef => {
          this.userSubject.next(userRef.data() as IUserData);
          localStorage.setItem('user', JSON.stringify(userRef.data()));
          this.router.navigate(['']);
        });
      }
    );
  }

  loadUserFromLocalStorage(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const user = JSON.parse(userDataString);
      this.userSubject.next(user as IUserData);
    }
  }

  signIn(email: string, password: string): Observable<string | null> {
    return new Observable<string | null>((observer) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.getUserData(userCredential.user?.uid);
          observer.complete();
        })
        .catch((error) => {
          observer.next(error.message);
          observer.complete();
        });
    });
  }

  createUser(email: string, password: string, firstName: string, age: string): Observable<string | null> {
    return new Observable<string | null>((observer) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const uid = userCredential.user!.uid;
          const newUser: IUserData = { email, firstName, age, uid, lastName: '', avatarUrl: '' };
          this.addNewUserToCollection(newUser);
          observer.complete();
        })
        .catch((error) => {
          observer.next(error.message);
          observer.complete();
        });
    });
  }

  addNewUserToCollection(newUser: IUserData): void {
    this.afFirestore.collection('users').add(newUser).then(()=>{
      localStorage.setItem('user', JSON.stringify(newUser));
      this.router.navigate(['']);
    });
  }

  checkIfUserExist(idToCheck: string | undefined): Promise<boolean> {
    return this.afFirestore.collection('users').ref.where('uid', '==', idToCheck)
      .get()
      .then(snapshot => !snapshot.empty)
      .catch(error => {
        console.error('checkIfUserExist error', error);
        return false;
      });
  }

  resetPassword(email: string): void {
    this.afAuth.sendPasswordResetEmail(email)
      .then(()=> {
        this.router.navigate(['/login']);
      })
      .catch((error)=> {
        console.error(error);
      });
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      })
      .catch(error => console.error(error));
  }

  updateUserInformation(uid: string, changes: any): void {
    this.afFirestore.collection('users').ref.where('uid', '==', uid).get()
      .then(snapshot => {
        snapshot.forEach(userRef => {
          const userData = userRef.data();
          userRef.ref.update(changes);
          const updatedUserData = { ...userData as IUserData, ...changes };
          localStorage.setItem('user', JSON.stringify(updatedUserData));
          this.userSubject.next(updatedUserData);
          this.router.navigate(['']);
        });
      })
      .catch(error => {
        console.error('Error getting documents: ', error);
      });
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<string | null> {
    return new Observable<string | null>((observer) => {
      this.afAuth.currentUser
        .then((user) => {
          if (user) {
            // TODO Login with old password
            this.afAuth.signInWithEmailAndPassword(user.email!, oldPassword)
              .then(() => {
                // TODO After successful login update password
                user.updatePassword(newPassword)
                  .then(() => {
                    alert('Password updated successfully');
                    this.router.navigate(['']);
                    observer.complete();
                  })
                  .catch((error)=>{
                    observer.next(error.message);
                    observer.complete();
                  });
              })
              .catch((error) => {
                observer.next(error.message);
                observer.complete();
              });
          }
        })
        .catch((error) => {
          observer.next(error.message);
          observer.complete();
        });
    });
  }

}
