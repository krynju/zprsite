import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {DirectoryData, FFile, Report} from '../../models/DirectoryData';
import {environment} from '../../../environments/environment';


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
  reportList: Report[];

  constructor(private interaction: InteractionService) {
  }


  ngOnInit() {
    this.directory_data();
    this.report_data();
  }

  fun_test() {
    this.interaction.report_list().subscribe((x) => console.log(x));

  }

  report_data() {
    this.interaction.report_list()
      .subscribe((data) => {
        this.reportList = data.map((x) =>
          new Report(x, 'http://' + environment.BACKEND_ADDRESS + '/report/' + x)
        ).sort((a, b) => {
          // ;
          return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
        });
      });
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
      .subscribe((data: { status, report_name }) => {
        const report = new Report(
          data.report_name,
          'http://' + environment.BACKEND_ADDRESS + '/report/' + data.report_name
        );

        this.reportList.unshift(report);
      });
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
