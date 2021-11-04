import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomActionRenderComponent } from './order-management/order-list/order-list.component';
import { OrderEditComponent } from './order-management/order-edit/order-edit/order-edit.component';
import { ModalService } from './services/modal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WindowService } from './services/window.service';


@NgModule({
  entryComponents: [
    CustomActionRenderComponent
  ],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NbSpinnerModule
  ],
  declarations: [
    ...routedComponents,
    CustomActionRenderComponent,
    OrderEditComponent
  ],
})
export class TablesModule { }
