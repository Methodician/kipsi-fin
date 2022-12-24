import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';
import { CreateProjectComponent } from '../../dialogs/create-project/create-project.component';
import { EditProjectComponent } from '../../dialogs/edit-project/edit-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;
  displayedColumns: string[] = [
    'name',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {
    this.projects$ = this.projectService.getAllProjects();
  }

  ngOnInit(): void {}

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.createProject(result).then(() => {
          // This feedback should be provided in a better way
          alert('Project created successfully');
        });
      } else {
        // This feedback should be provided in a better way
        alert('Project creation cancelled');
      }
    });
  }

  openEditDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '400px',
      data: { project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.updateProject(result).then(() => {
          // This feedback should be provided in a better way
          alert('Project updated successfully');
        });
      } else {
        // This feedback should be provided in a better way
        alert('Project update cancelled');
      }
    });
  }

  deleteProject(project: Project): void {
    this.projectService.deleteProject(project.id);
  }
}
