import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models';

@Pipe({
  name: 'projectFilter',
})
export class ProjectFilterPipe implements PipeTransform {
  // TODO: build a service in the cloud to index projects with
  // their expenses for faster and more comprehensive search
  // this is not too scalable, but flexible and convenient for MVP
  transform(items: Project[], searchText: string): Project[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
      );
    });
  }
}
