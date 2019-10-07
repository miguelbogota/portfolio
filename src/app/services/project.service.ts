import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = "/assets/data/projects.json";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.url);
  }

}
