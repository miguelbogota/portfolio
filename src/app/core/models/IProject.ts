import { firestore } from 'firebase/app';

export interface IProject {
  id: string;
  title: string;
  subtitle: string;
  dateStart: firestore.Timestamp;
  dateEnd: firestore.Timestamp;
  imgUrl: string;
  link: string;
  desc: string;
}
