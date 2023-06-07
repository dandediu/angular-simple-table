import { Injectable } from '@angular/core';
import { TableColumn } from './table-column.model';
// import * as _ from 'lodash';
import { UtilsService } from './utils.service';
import { SortDirection } from './sort-direction.types';

@Injectable()
export class TableSearchService {
  constructor(private _utils: UtilsService) {}

  public searchInTableData(
    params: string,
    tableColumns: TableColumn[],
    tableData: Array<object>
  ): Array<object> {
    // get the value of the key pressed and make it lowercase
    const value = params.toLowerCase();

    // get the key names of each column in the dataset
    const keys = tableColumns
      .map((column) => column.property)
      .filter((key) => key !== 'actions');
    // get the amount of columns in the table
    const columnsLength = keys.length;
    // assign filtered matches to the active data table
    const data = tableData.filter((item: any) => {
      // iterate through each row's column data
      for (let columnIndex = 0; columnIndex < columnsLength; columnIndex++) {
        // check for a match
        if (
          item[keys[columnIndex]].toString().toLowerCase().indexOf(value) !==
            -1 ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
      return;
    });

    // ! whenever the filter changes, always go back to the table's first page
    tableColumns.forEach((col: TableColumn) => {
      if (col.hasSortActive) {
        const sortDir =
          col.sortDirection !== SortDirection.unset ? col.sortDirection : 'asc';

        this._utils.orderBy(data, [col.property], [sortDir]);
      }
    });
    return data;
  }
}
