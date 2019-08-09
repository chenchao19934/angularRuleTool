import { Injectable } from '@angular/core';

import { ZPLModal } from '../../zplmodal/zpl.modal';
import { TextModal } from '../../zplmodal/text-modal';
import { BarcodeModal } from '../../zplmodal/barcode-modal';
import { QrcodeModal } from '../../zplmodal/qrcode-modal';

@Injectable()
export class ZplService {
  public widgetList: Array<Object> = [];
  public currentWidget: ZPLModal;
  public widgetMap: any = {};

  constructor() { }

  public addWidget(widgetType = 'Text', config?: any) {
    let widget: ZPLModal = this._getWidgetClass(widgetType, config);
    this.setCurrentWidget(widget);
    this.widgetList.push(widget);
    return widget;
  }

  private _getWidgetClass(widgetType: string, config?: any) {
    let widgetClass: ZPLModal;
    switch (widgetType) {
      case 'Text': widgetClass = new TextModal(config); break;
      case 'Barcode': widgetClass = new BarcodeModal(config); break;
      case 'Qrcode': widgetClass = new QrcodeModal(config); break;
    }
    if (!widgetClass.id) {
      widgetClass.id = this.getUniqueId();
    }
    console.log(widgetClass);
    this._addWidgetToMap(widgetClass);
    return widgetClass;
  }

  private _addWidgetToMap(widget: ZPLModal) {
    let key = widget.id;
    this.widgetMap[key] = widget;
  }

  private _clearWidgetMap() {
    this.widgetMap = {};
  }

  private _setWidgetList(eles: Array<any>) {
    let array: ZPLModal[] = [];
    for (let el of eles) {
      array.push(this._getWidgetClass(el.type, el));
    }
    this.widgetList = array;
  }

  public getWidgetList() {
    return this.widgetList;
  }

  public setCurrentWidget(widget: ZPLModal) {
    this.currentWidget = widget;
  }

  getCurrentWidget() {
    return this.currentWidget;
  }

  public getUniqueId(): string {
    return 'zhichi_' + Math.round(Math.random() * Math.pow(10, 12));
  }
}