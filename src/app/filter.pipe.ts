import { Pipe, PipeTransform } from '@angular/core';
import { CrudModels } from './models/crudModels.component';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: CrudModels): any {
      if (!items || !filter) {
        //For first time Enter
        return items;
      }
      //When do filtering
      return items.filter(item => item.recipeType.indexOf(filter) > -1);
  }

}
