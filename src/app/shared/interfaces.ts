import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export interface IUserData {
  email: string;
  uid: string;
  firstName: string;
  lastName: string;
  age: string;
  avatarUrl: string;
}

export interface IArticle {
  title: string;
  category: string;
  text: string;
  imageUrl: string;
  date: Timestamp;
  userId: string;
  userName: string;
  userAvatar: string;
  id?: string
}

export type AuthProvider = 'google' | 'facebook';
