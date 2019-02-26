import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { Comp1Component } from './comp1/comp1.component';
import { CompComponent } from './comp/comp.component';

import { ROUTES } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { SubMenuItemComponent } from './menu/menu-item/sub-menu-item/sub-menu-item.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { BudgetComponent } from './budget/budget.component';

import { PaginationLinkComponent } from './pagination-link/pagination-link.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { BudgetTableComponent } from './budget/budget-table/budget-table.component';

import { AppService } from './app.service';
import { StartService } from './start.service';
import { InputComponent } from './shared/input/input.component';
import { RadioComponent } from './shared/radio/radio.component';

import {MatFormFieldModule, MatAutocompleteModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BudgetNewComponent } from './budget/budget-new/budget-new.component';


@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    CompComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    SettingsComponent,
    MenuItemComponent,
    SubMenuItemComponent,
    OrcamentoComponent,
    BudgetComponent,
    PaginationLinkComponent,
    TableComponent,
    LoginComponent,
    BudgetTableComponent,
    InputComponent,
    RadioComponent,
    BudgetNewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [
      AppService,
      StartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }