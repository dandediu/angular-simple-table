import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { filter, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SortDirection, sortDirectionTypes } from './sort-direction.types';
import { ITableColumn, TableColumn } from './table-column.model';
import { TableSearchService } from './table-search.service';
import { TableSortingService } from './table-sorting.service';
import { UtilsService } from './utils.service';

@Component({
  selector: 'simple-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],

  providers: [TableSortingService, TableSearchService],
})
export class TableComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() tableColumns: Array<ITableColumn> = [];
  @Input() tableData: Array<object> = [];
  @Input() hasSearch = true;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ContentChild('actionsCell', { static: false })
  actionsCell!: TemplateRef<{}>;

  public rows: Array<object> = [];
  public columns: Array<TableColumn> = [];
  public temporaryRows: Array<object> = [];
  private _destroy$: Subject<void> = new Subject<void>();
  public filter = '';

  // PAGINATION
  paginatorConfig: PaginationInstance = {
    id: 'table-paginator',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(
    private _sortService: TableSortingService,
    private _searchService: TableSearchService,
    private _utils: UtilsService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableColumns']) {
      this.columns = this.tableColumns.map(
        (item: ITableColumn) => new TableColumn(item)
      );
    }

    if (changes['tableData']?.currentValue) {
      this.rows = [...this.tableData];
      // this.temporaryRows = [...this.tableData];
      this.paginatorConfig.totalItems = this.tableData.length;
      // this._setItemsPerPage(0, this._rowsCount);
    }
  }

  ngAfterViewInit(): void {
    if (this.hasSearch && this.searchInput) {
      fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
        .pipe(filter(Boolean), debounceTime(1500), distinctUntilChanged())
        .pipe(takeUntil(this._destroy$))
        .subscribe((event: KeyboardEvent) => {
          const searchValue = (event.target as HTMLInputElement).value;
          console.log('HTML EVENT', searchValue);

          this.rows = this._searchService.searchInTableData(
            searchValue,
            this.columns,
            this.tableData
          );
          console.log('HTML EVENT', searchValue);

          this.paginatorConfig.currentPage = 1;
        });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onChangePage(event: number): void {
    this.paginatorConfig.currentPage = event;
  }

  onSort(sortDir: sortDirectionTypes, column: TableColumn): void {
    column.sortDirection = sortDir;
    column.hasSortActive = true;

    // Single column sort
    this.columns.map((col: TableColumn) => {
      if (col.property !== column.property) {
        col.hasSortActive = false;
        col.sortDirection = SortDirection.unset;
      }
      return col;
    });

    this.rows = this._sortService.sortByOneColumn([...this.rows], column);

    this.paginatorConfig.currentPage = 1;
  }

  getCellValue(row: any, col: ITableColumn): string | null {
    if (col.property) {
      if (this._utils.isBoolean(row[col.property])) {
        return row[col.property] ? '&#10003;' : '&#x2715;';
      }

      return row[col.property];
    }
    return null;
  }

  get totalItems(): number {
    return this.tableData.length;
  }
}
