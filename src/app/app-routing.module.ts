import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './components/projects/project-detail/project-detail.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
