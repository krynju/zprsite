import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {FFile} from '../../models/DirectoryData';
import {DirectoryData} from '../../models/DirectoryData';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})


export class PageComponent implements OnInit {

  currentDirectoryData: DirectoryData;
  displayedColumns: string[] = ['select', 'name'];
  selection = new SelectionModel<FFile>(true, []);
  dataSource = new MatTableDataSource<FFile>();

  constructor(private interaction: InteractionService) {

  }

  ngOnInit() {
    this.directory_data();
  }

  fun_test() {
    console.log(this.selection.selected);
    this.interaction.communication_test()
      .subscribe((data) => console.log(data));
  }

  directory_data() {
    this.interaction.get_cwd()
      .subscribe((data: DirectoryData) => {
        this.currentDirectoryData = data;
        this.dataSource = new MatTableDataSource<FFile>(data.files);
        console.log(data);
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: FFile): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }



}
