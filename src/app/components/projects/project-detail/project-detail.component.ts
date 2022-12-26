import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Project, Expense } from 'src/app/models';
import { ExpenseService } from 'src/app/services/expense.service';
import { ProjectService } from 'src/app/services/project.service';
import { EditProjectComponent } from '../../dialogs/edit-project/edit-project.component';
import { AddExpenseComponent } from '../../dialogs/add-expense/add-expense.component';
import { ProjectUpdate } from 'src/app/models/project.models';
import { EditExpenseComponent } from '../../dialogs/edit-expense/edit-expense.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  project$?: Observable<Project>;
  expenses$?: Observable<Expense[]>;
  displayedColumns: string[] = ['date', 'amount', 'isQualified', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error(
        'The ProjectDetailComponent requires an "id" in the route.'
      );
    }
    this.project$ = this.projectService.getProjectById(id);
    this.project$.subscribe((project) => {
      this.expenses$ = this.expenseService.getExpensesForProject(project);
    });
  }

  openProjectEditDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '400px',
      data: { project },
    });

    dialogRef.afterClosed().subscribe((wasSuccessful) => {
      console.log(wasSuccessful);
      if (wasSuccessful) {
        // This feedback should be provided in a better way
        alert(
          'Project updated successfully (we would provide this feedback in a better way IRL)'
        );
      } else {
        // This feedback should be provided in a better way
        alert(
          'Project update failed (we would provide this feedback in a better way IRL)'
        );
      }
    });
  }

  openExpenseAddDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '400px',
      data: { projectId: this.route.snapshot.paramMap.get('id') },
    });

    dialogRef.afterClosed().subscribe((expense) => {
      if (!this.project$) {
        throw new Error('This component should have a project$ property');
      }
      if (expense) {
        this.project$.pipe(first()).subscribe(async (project) => {
          // IRL these should be done in a transaction or batch update
          const id = await this.expenseService.createExpense(expense);
          const projectUpdate: ProjectUpdate = {
            id: expense.projectId,
            expenseIds: [...project.expenseIds, id],
          };
          this.projectService.updateProject(projectUpdate);
        });
      }
    });
  }

  openExpenseEditDialog(expense: Expense): void {
    const dialogRef = this.dialog.open(EditExpenseComponent, {
      width: '400px',
      data: { expense },
    });

    dialogRef.afterClosed().subscribe((expense) => {
      if (expense) {
        this.expenseService.updateExpense(expense);
      } else {
        // This feedback should be provided in a better way
        alert(
          'Expense update failed (we would provide this feedback in a better way IRL)'
        );
      }
    });
  }

  deleteExpense(expense: Expense): void {
    // This should be done in a transaction or batch update
    this.project$?.pipe(first()).subscribe((project) => {
      const projectUpdate: ProjectUpdate = {
        id: project.id,
        expenseIds: project.expenseIds.filter((id) => id !== expense.id),
      };
      this.projectService.updateProject(projectUpdate);
      this.expenseService.deleteExpense(expense.id);
    });
  }
}
