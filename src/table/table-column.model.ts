import { sortDirectionTypes } from './sort-direction.types';

export interface ITableColumn {
  label: string;
  property?: string;
  sortable?: boolean;
  link?: null | string;
  icon?: null | string;
}

export class TableColumn implements ITableColumn {
  private _label: string = '';
  private _property: string = ''; // strict object key
  private _sortable: boolean = true;
  private _sortDirection: sortDirectionTypes = 'unset';
  private _hasSortActive = false;
  private _link: null | string = '';
  private _icon: null | string = '';

  constructor(column: ITableColumn) {
    Object.assign(this, column);
  }

  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }

  get sortable(): boolean {
    return this._sortable;
  }
  set sortable(value: boolean) {
    this._sortable = value;
  }

  get sortDirection(): sortDirectionTypes {
    return this._sortDirection;
  }
  set sortDirection(value: sortDirectionTypes) {
    this._sortDirection = value;
  }

  get property(): string {
    return this._property;
  }
  set property(value: string) {
    this._property = value;
  }

  get hasSortActive() {
    return this._hasSortActive;
  }
  set hasSortActive(value) {
    this._hasSortActive = value;
  }

  get icon(): null | string {
    return this._icon;
  }
  set icon(value: null | string) {
    this._icon = value;
  }

  get link(): null | string {
    return this._link;
  }
  set link(value: null | string) {
    this._link = value;
  }
}
