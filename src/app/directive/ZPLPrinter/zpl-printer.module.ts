import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ZplService } from './zpl-printer.service';
import { ZplPrinterComponent } from './zpl-printer.component';
import { AngularDraggableDirective } from "../draggable/angular-draggable.directive";

// 路由
import { WidgetSetting } from '../../zplmodal/Text/textSetting.component';
export const settingArray = [
  WidgetSetting
]
export const routes: Routes = [
  { path: '', component: ZplPrinterComponent },
  { path: 'widgetSetting', component: WidgetSetting }
]

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    ...settingArray,
    ZplPrinterComponent,
    AngularDraggableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ZplService]
})

export class ZplPrientModule { }