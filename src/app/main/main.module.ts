import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {PageComponent} from './page/page.component';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatCommonModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

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
  ]
})
export class MainModule {
}
