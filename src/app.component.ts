import { Component } from '@angular/core';
import DATA_MOCK from './data.mock';
import { ITableColumn } from './table/table-column.model';

@Component({
  selector: 'app',
  template: `
    <h1>Hello from {{name}}!</h1>
    <simple-table [tableData]="data" [tableColumns]="columns">
      <ng-template #actionsCell>
        <button class="btn btn--text">Edit</button>
      </ng-template>
    </simple-table>
  `,
})
export class AppComponent {
  name = '';
  data = DATA_MOCK;
  columns: ITableColumn[] = [
    { label: 'Row', property: 'id' },
    { label: 'First Name', property: 'first' },
    { label: 'Last Name', property: 'last' },
    { label: 'Email', property: 'email' },
    // { label: 'Actions', key: 'actions', sortable: false },
  ];
}
