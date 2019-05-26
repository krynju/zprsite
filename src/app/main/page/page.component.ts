import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  currentDirectoryData: DirectoryData;
  displayedColumns: string[] = ['select', 'name'];
  selection = new SelectionModel<string>(true, []);
  dataSource = new MatTableDataSource<string>();

  constructor(private interaction: InteractionService) {
  }

  ngOnInit() {
    this.directory_data();
  }

  fun_test() {
    this.interaction.communication_test()
      .subscribe((data) => console.log(data));
  }

  directory_data() {
    this.interaction.get_cwd()
      .subscribe((data: DirectoryData) => {
        this.currentDirectoryData = data;
        this.dataSource = new MatTableDataSource<string>(data.files);
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: string): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row + 1}`;
  }
}
