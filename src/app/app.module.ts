import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { RuleToolComponent } from "./directive/ruleTool/rule.component";
import { ZplPrinterComponent } from "./directive/ZPLPrinter/zpl-printer.component";
import { AngularDraggableDirective } from "./directive/draggable/angular-draggable.directive";
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    RuleToolComponent,
    ZplPrinterComponent,
    AngularDraggableDirective
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
