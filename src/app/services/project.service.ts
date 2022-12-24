import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter } from 'rxjs';
import { Project } from '../models';
import { ProjectCreate, ProjectUpdate } from '../models/project.models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private firestore: AngularFirestore) {}

  getAllProjects(): Observable<Project[]> {
    return this.firestore.collection<Project>('projects').valueChanges();
  }

  createProject(project: ProjectCreate): Promise<void> {
    const id = this.firestore.createId();
    project.id = id;
    return this.firestore.doc(`projects/${id}`).set(project);
  }

  updateProject(project: ProjectUpdate): Promise<void> {
    return this.firestore.doc(`projects/${project.id}`).update(project);
  }

  deleteProject(id: string): Promise<void> {
    return this.firestore.doc(`projects/${id}`).delete();
  }

  getProjectById(id: string): Observable<Project> {
    return this.firestore
      .doc<Project>(`projects/${id}`)
      .valueChanges()
      .pipe(filter((project) => !!project)) as Observable<Project>;
  }
}
