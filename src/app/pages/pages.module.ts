import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { TablesModule } from './order/tables.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    TablesModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
