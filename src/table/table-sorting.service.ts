import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { SortDirection } from './sort-direction.types';
import { TableColumn } from './table-column.model';

@Injectable()
export class TableSortingService {
  constructor(private _utils: UtilsService) {}

  sortByOneColumn(
    tableRows: Array<object>,
    column: TableColumn
  ): Array<object> {
    return column.sortDirection !== SortDirection.unset
      ? this._utils.orderBy(
          tableRows,
          [column.property],
          [column.sortDirection]
        )
      : tableRows;
  }
}
