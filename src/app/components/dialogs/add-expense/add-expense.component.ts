import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Expense } from '../../../models';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { projectId: string }
  ) {
    this.form = this.formBuilder.group({
      date: [null, Validators.required],
      amount: [null, Validators.required],
      isQualified: [true],
    });
  }

  save() {
    if (this.form.valid) {
      const expense: Expense = {
        ...this.form.value,
        projectId: this.data.projectId,
      };
      this.dialogRef.close(expense);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
