import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SortDirection, sortDirectionTypes } from '../sort-direction.types';

@Component({
  selector: 'table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss'],
})
export class TableSortComponent implements OnChanges {
  @Output() changeDirection = new EventEmitter();
  @Input() sortDirection: sortDirectionTypes = SortDirection.unset;
  public ascendent = SortDirection.asc;
  public descendent = SortDirection.desc;

  ngOnChanges(changes: SimpleChanges): void {
    const changedDirection = changes['sortDirection']?.currentValue;

    if (changedDirection) {
      this.sortDirection = changedDirection;
    }
  }

  onChangeDir(): void {
    let direction = SortDirection.unset;

    switch (this.sortDirection) {
      case SortDirection.unset: {
        direction = SortDirection.asc;
        break;
      }
      case SortDirection.asc: {
        direction = SortDirection.desc;
        break;
      }
      case SortDirection.desc: {
        direction = SortDirection.asc;
        break;
      }
    }

    this.changeDirection.emit(direction);
  }
}
