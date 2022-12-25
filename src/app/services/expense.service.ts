import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter, combineLatest } from 'rxjs';
import { Expense, Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private firestore: AngularFirestore) {}

  async createExpense(expense: Expense): Promise<string> {
    const id = this.firestore.createId();
    expense.id = id;
    await this.firestore.doc(`expenses/${id}`).set(expense);
    return id;
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

  deleteExpense(id: string): Promise<void> {
    return this.firestore.doc(`expenses/${id}`).delete();
  }
}
