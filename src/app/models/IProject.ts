import { firestore } from 'firebase/app';

export interface IProject {
  id: string;
  title: string;
  dateStart: firestore.Timestamp;
  dateEnd: firestore.FieldValue;
  imgUrl: string;
  desc: string;
}