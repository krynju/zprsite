import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {PageComponent} from './page/page.component';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
