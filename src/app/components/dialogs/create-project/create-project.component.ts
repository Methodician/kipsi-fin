import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (this.form.valid) {
      const project: Project = {
        id: '',
        name: this.form.get('name')!.value,
        description: this.form.get('description')!.value,
        startDate: this.form.get('startDate')!.value,
        endDate: this.form.get('endDate')!.value,
        expenseIds: [],
      };

      this.dialogRef.close(project);
    } else {
      alert('Please fix the errors before submitting the form.');
      this.form.markAllAsTouched();
    }
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
