import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { RuleToolComponent } from "./directive/ruleTool/rule.component";
import { ZplPrientModule } from "./directive/ZPLPrinter/zpl-printer.module";

import { RouterModule, Routes } from '@angular/router';
export const routers: Routes = [
  { path: '', component: AppComponent },
  { path: 'dialog', loadChildren: './directive/ZPLPrinter/zpl-printer.module#ZplPrientModule' },
  { path: 'ruleTool', component: RuleToolComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
]


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    RuleToolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ZplPrientModule,
    RouterModule.forRoot(routers)
  ],
  providers: []
})
export class AppModule { }
