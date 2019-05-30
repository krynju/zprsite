import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {FFile} from '../../models/DirectoryData';
import {DirectoryData} from '../../models/DirectoryData';
import {Router} from '@angular/router';

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

  selectedColumns = {};

  constructor(private interaction: InteractionService, private router: Router) {

  }

  ngOnInit() {
    this.directory_data();
  }

  fun_test() {
    console.log(this.selectedColumns);
    this.router.navigateByUrl('/app/report');
    // this.interaction.see_report('dwada')
    //   .subscribe(()=> );
  }

  generateReport() {


    const cargo = this.selection.selected
      .map((x) => {
        return {
          filename: x.filename,
          column: this.selectedColumns[x.filename].column,
          type: this.selectedColumns[x.filename].type,
        };
      });

    console.log(cargo);

    if (this.selection.selected.length !== 2) {
      return;
    }

    this.interaction.report_request(cargo)
      .subscribe();
  }

  directory_data() {
    this.interaction.get_cwd()
      .subscribe((data: DirectoryData) => {
        this.currentDirectoryData = data;
        this.dataSource = new MatTableDataSource<FFile>(data.files);
        for (const i of this.currentDirectoryData.files.filter((x) => x.status === 'csv')) {
          this.selectedColumns[i.filename] = {column: i.columns[0], type: 'continuous'};
        }
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.filename + 1}`;
  }


}
