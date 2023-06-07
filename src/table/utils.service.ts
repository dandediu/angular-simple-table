import { Injectable } from '@angular/core';
import { sortDirectionTypes } from './sort-direction.types';

type OrderByProperty<T> = string | ((item: T) => any);

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  orderBy<T>(
    array: T[],
    properties: OrderByProperty<T> | OrderByProperty<T>[],
    directions: sortDirectionTypes | sortDirectionTypes[]
  ): T[] {
    const props = Array.isArray(properties) ? properties : [properties];
    const dirs = Array.isArray(directions) ? directions : [directions];

    return array.slice().sort((a: any, b: any) => {
      for (let i = 0; i < props.length; i++) {
        const prop: any = props[i];
        const dir = dirs[i];

        const valueA = typeof prop === 'function' ? prop(a) : a[prop];
        const valueB = typeof prop === 'function' ? prop(b) : b[prop];

        if (valueA < valueB) {
          return dir === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return dir === 'asc' ? 1 : -1;
        }
      }

      return 0;
    });
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}
