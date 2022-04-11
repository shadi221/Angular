import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(arr: any, search: string): any {
    let filterArray = [];
    if (search == undefined) {
      filterArray = arr;
    } else {
      arr.map((item) => {
        if (item.name.toLowerCase().startsWith(search)) {
          filterArray.push(item);
        }
      });
    }
    return filterArray;
  }
}
