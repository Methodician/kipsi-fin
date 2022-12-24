import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase stuff
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

// Angular Material stuff
// table
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
// dialog
import { MatDialogModule } from '@angular/material/dialog';
// form field
import { MatFormFieldModule } from '@angular/material/form-field';
// input
import { MatInputModule } from '@angular/material/input';
// button
import { MatButtonModule } from '@angular/material/button';
// datepicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// icon
import { MatIconModule } from '@angular/material/icon';

// Internal
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProjectComponent } from './components/dialogs/create-project/create-project.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { EditProjectComponent } from './components/dialogs/edit-project/edit-project.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProjectComponent,
    ExpensesComponent,
    ProjectsComponent,
    ProjectListComponent,
    EditProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
