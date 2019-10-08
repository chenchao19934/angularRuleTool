import { Component, Input } from '@angular/core';
import { ZPLModal } from "../zpl.modal";

@Component({
  selector: 'widget-setting',
  templateUrl: './textSetting.component.html',
  styleUrls: ['./textSetting.component.css']
})
export class WidgetSetting {
  @Input() currentWidget: ZPLModal;
  constructor() {

  }
}