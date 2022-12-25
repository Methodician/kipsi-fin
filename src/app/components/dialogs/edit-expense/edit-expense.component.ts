import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Expense } from '../../../models';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { expense: Expense }
  ) {
    this.form = this.formBuilder.group({
      date: [this.data.expense.date, Validators.required],
      amount: [this.data.expense.amount, Validators.required],
      isQualified: [this.data.expense.isQualified],
    });
  }

  save() {
    if (this.form.valid) {
      const expense: Expense = {
        ...this.form.value,
        id: this.data.expense.id,
        projectId: this.data.expense.projectId,
      };
      this.dialogRef.close(expense);
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
