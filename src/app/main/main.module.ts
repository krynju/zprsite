import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {PageComponent} from './page/page.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [PageComponent],
  imports: [
    MatButtonModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
