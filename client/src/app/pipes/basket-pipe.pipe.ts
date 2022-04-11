import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basketPipe',
})
export class BasketPipePipe implements PipeTransform {
  transform(arr: any, search: string): any {
    let filterArray = [];

    if (search == undefined) {
      filterArray = arr;
    } else {
      arr.map((item) => {
        if (item.product.name.toLowerCase().startsWith(search)) {
          filterArray.push(item);
        }
      });
    }
    return filterArray;
  }
}
