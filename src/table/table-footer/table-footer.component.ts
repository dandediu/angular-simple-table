import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss'],

})
export class TableFooterComponent {
  @Input() paginatorConfig: PaginationInstance = {
    id: 'table-paginator',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };
  @Input() rows: Array<any> = [];
  @Output() changeRowCount = new EventEmitter();
  @Output() changePage = new EventEmitter();

  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = false;
  public rowsCount = 5;
  public rowsCountOptions = [5, 10, 15, 20];
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };

  onChangePage(event: number): void {
    this.changePage.emit(event);
  }

  public onPageBoundsCorrection(number: number) {
    this.paginatorConfig.currentPage = number;
  }

  get getRowsRange(): string {
    const { itemsPerPage, currentPage } = this.paginatorConfig;
    const currentRange = itemsPerPage * currentPage;
    const rageStart =
      currentPage > 1 ? currentRange - itemsPerPage : currentPage;
    const rangeEnd = this.rows.slice(0, currentRange).length;

    return `${rageStart}-${rangeEnd}`;
  }
}
