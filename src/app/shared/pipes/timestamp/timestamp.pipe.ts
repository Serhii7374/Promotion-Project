import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(timestamp: Timestamp): string {
    const date = new Date(timestamp.seconds*1000);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
  }

}
