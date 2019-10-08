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

  _getWidgetClass(widgetType: string, config?: any) {
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

  _addWidgetToMap(widget: ZPLModal) {
    let key = widget.id;
    this.widgetMap[key] = widget;
  }

  _clearWidgetMap() {
    this.widgetMap = {};
  }

  _deleteWidgetMapDataById(id: string) {
    delete this.widgetMap[id];
  }

  _setWidgetList(eles: Array<any>) {
    let array: ZPLModal[] = [];
    for (let el of eles) {
      array.push(this._getWidgetClass(el.type, el));
    }
    this.widgetList = array;
  }

  public removeWidget(widgetId: string) {
    this._deleteCurrentWidget(widgetId);
    this._deleteWidgetMapDataById(widgetId);
  }

  _deleteCurrentWidget(widgetId: string) {
    let widgetList = this.widgetList;
    let moveWidgetData = typeof widgetId === 'object' ? widgetId : this.getWidgetById(widgetId);
    let index = widgetList.indexOf(moveWidgetData);
    if (index >= 0) {
      widgetList.splice(index, 1);
    }
  }

  public getWidgetById(id: string) {
    return this.widgetMap[id];
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