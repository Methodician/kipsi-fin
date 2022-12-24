import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../models';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.form = this.fb.group({
      name: [this.data.project.name, [Validators.required]],
      description: [this.data.project.description, [Validators.required]],
      startDate: [this.data.project.startDate.toDate(), [Validators.required]],
      endDate: [this.data.project.endDate.toDate(), [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.projectService.updateProject({
        id: this.data.project.id,
        name: this.form.get('name')!.value,
        description: this.form.get('description')!.value,
        startDate: this.form.get('startDate')!.value,
        endDate: this.form.get('endDate')!.value,
        expenseIds: this.data.project.expenseIds,
      });
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getNameErrorMessage() {
    const nameControl = this.form.get('name');
    return nameControl?.hasError('required')
      ? 'You must enter a name'
      : nameControl?.hasError('minlength')
      ? 'Name must be at least 3 characters long'
      : '';
  }

  getDescriptionErrorMessage() {
    const descriptionControl = this.form.get('description');
    return descriptionControl?.hasError('required')
      ? 'You must enter a description'
      : '';
  }

  getStartDateErrorMessage() {
    const startDateControl = this.form.get('startDate');
    return startDateControl?.hasError('required')
      ? 'You must enter a start date'
      : '';
  }

  getEndDateErrorMessage() {
    const endDateControl = this.form.get('endDate');
    return endDateControl?.hasError('required')
      ? 'You must enter an end date'
      : '';
  }
}
