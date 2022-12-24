import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter, combineLatest } from 'rxjs';
import { Expense, Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private firestore: AngularFirestore) {}

  createExpense(expense: Expense): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`expenses/${id}`).set(expense);
  }

  updateExpense(expense: Expense): Promise<void> {
    return this.firestore.doc(`expenses/${expense.id}`).update(expense);
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.firestore
      .doc<Expense>(`expenses/${id}`)
      .valueChanges()
      .pipe(filter((expense) => !!expense)) as Observable<Expense>;
  }

  getExpensesForProject(project: Project): Observable<Expense[]> {
    const expenseObservables = project.expenseIds.map((expenseId) => {
      return this.getExpenseById(expenseId);
    });
    return combineLatest(expenseObservables);
  }
}
