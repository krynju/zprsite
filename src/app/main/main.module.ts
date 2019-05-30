import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {PageComponent} from './page/page.component';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatCommonModule, MatRadioModule, MatSelectModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [PageComponent],
  imports: [
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MainRoutingModule,
    MatCheckboxModule,
    MatCardModule,
    MatCommonModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
  ]
})
export class MainModule {
}
