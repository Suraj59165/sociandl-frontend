import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ActionEvent, ActionOptionType, ColumnOptions, ListEvent} from './src/ColumnOptions';
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-sp-table',
  templateUrl: './sp-table.component.html',
  styleUrls: ['./sp-table.component.css'],
  standalone: false
})
export class SpTableComponent implements OnChanges {
  @Input() tableColumns: ColumnOptions[] = [];
  @Input() tableData: any[] = [];
  @Output() pageChange = new EventEmitter<ListEvent>();
  @Output() action = new EventEmitter<ActionEvent>();
  @Output() rowSelect = new EventEmitter<any>();  // ✅ Ensure row selection event exists

  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number;
  @Input() showSkeleton: boolean = false;
  protected readonly AppConst = AppConst;

  constructor() {
  }

  onPageChange(event: any): void {
    this.currentPage = (event.first / event.rows) + 1;
    this.itemsPerPage = event.rows;
    this.pageChange.emit({pageNumber: this.currentPage, pageLimit: this.itemsPerPage});
  }

  sortData(column: ColumnOptions): void {
    const sortField = column.columnData;
    this.tableData.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  }

  onAction(actionType: ActionOptionType, rowData: any): void {
    this.action.emit({rowData, actionType}); // ✅ Fix: Emit actual `rowData`
  }

  onRowSelect(event: any): void {
    this.rowSelect.emit(event.data); // ✅ Ensure row selection works
  }

  getActionIcon(action: ActionOptionType): string {
    switch (action) {
      case 'EDIT':
        return 'pi pi-pencil';
      case 'DELETE':
        return 'pi pi-trash';
      case 'VIEW':
        return 'pi pi-eye';
      case 'REFRESH':
        return 'pi pi-refresh';
      case 'CANCEL':
        return 'pi pi-times';
      case 'ADD':
        return 'pi pi-plus';
      case 'DOWNLOAD':
        return 'pi pi-download';
      case 'CHAT':
        return 'pi pi-comments';

      default:
        return 'pi pi-cog';
    }
  }

  getActionColor(action: ActionOptionType): string {
    switch (action) {
      case 'EDIT':
        return 'text-success';
      case 'DELETE':
        return 'text-danger';
      case 'VIEW':
        return 'text-primary';
      case 'REFRESH':
        return 'text-success';
      case 'CANCEL':
        return 'text-secondary';
      case 'ADD':
        return 'text-info';
      case 'DOWNLOAD':
        return 'text-dark';
      case 'CHAT':
        return 'text-success';
      default:
        return 'text-muted';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showSkeleton && (this.tableData?.length === 0 && this.tableColumns.length > 0)) {
      this.tableData = []
      this.tableData = Array(5).fill(null).map((_, rowIndex) => {
        // const rowData = {};
        const rowData: { [key: string]: any } = {};
        this.tableColumns.forEach((col, colIndex) => {
          rowData[col.header || `column${colIndex + 1}`] = `Data ${rowIndex + 1}-${colIndex + 1}`;
        });
        return rowData;
      });
    } else {
      this.showSkeleton = false;
    }
  }

}
