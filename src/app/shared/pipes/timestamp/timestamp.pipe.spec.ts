import { TimestampPipe } from './timestamp.pipe';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

describe('TimestampPipe', () => {
  let pipe: TimestampPipe;
  const mockData = Timestamp.fromDate(new Date('17 November 2023'));

  beforeEach(()=> {
    pipe = new TimestampPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('output right result', () => {
    expect(pipe.transform(mockData)).toEqual('17 Nov 2023');
  });

  it('output right result', () => {
    expect(pipe.transform(mockData)).toEqual('17 Nov 2023');
  });
});
