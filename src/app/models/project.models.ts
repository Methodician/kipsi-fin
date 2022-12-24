import { Timestamp } from '@angular/fire/firestore';

// May use inheritance to reduce code duplication
export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Timestamp;
  endDate: Timestamp;
  expenseIds: string[];
}

export interface ProjectUpdate {
  id: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  expenseIds?: string[];
}

export interface ProjectCreate {
  id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expenseIds: string[];
}
