import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ZplService } from "./zpl-printer.service";

@Component({
	selector: 'zpl-printer',
	templateUrl: './zpl-printer.component.html',
	styleUrls: ['./zpl-printer.component.css']
})

export class ZplPrinterComponent implements OnInit, OnDestroy, AfterViewInit {
	public self: HTMLElement;
	public inBounds = true;
	public myOutOfBounds = { top: false, bottom: true, right: true, left: false };

	public maxRigth = 0;
	public pageStyle = {
		width: 70,
		height: 40
	}

	constructor(el: ElementRef, public zplService: ZplService, private renderer2: Renderer2) {
		this.self = el.nativeElement;
	}

	ngOnInit(): void { }
	ngAfterViewInit(): void {
		this.maxRigth = this.self.querySelector('.drag-boundary').clientWidth
	}
	ngOnDestroy(): void { }

	add(type: string) {
		let getWidgetList = this.zplService.getWidgetList();
		console.log(getWidgetList);
		switch (type) {
			case 'Text':
				this.zplService.addWidget(type, {
					title: '订单类型：',
					position: { x: 10, y: 10 }
				});
				break;
			case 'Barcode':
				this.zplService.addWidget(type, {
					content: 'https://b.yzcdn.cn/retail/img/setting/design/barcode.png',
					position: { x: 10, y: 10 }
				});
				break;
			case 'Qrcode':
				this.zplService.addWidget(type, {
					content: 'https://b.yzcdn.cn/retail/img/setting/design/qrcode.svg',
					position: { x: 10, y: 10 }
				});
				break;
		}
	}

	clickWidget(widget) {
		if (!widget) return;
		this.zplService.setCurrentWidget(widget);
	}

	removeWidget(widgetId: string) {
		console.log(widgetId);
		this.zplService.removeWidget(widgetId);
	}

	changePosition(event, widget) {
		let widgetDom = this.self.querySelector(`#${widget.id}`);
		switch (widget.type) {
			case 'Text':
				if (this.maxRigth - event.x < 16) {
					event.x = this.maxRigth - 16
				}
				break;
			case 'Qrcode':
			case 'Barcode':
				let widgetWidth = widgetDom.clientWidth * 55.6 / this.pageStyle.width;
				if (this.maxRigth - event.x < widgetWidth) {
					event.x = this.maxRigth - widgetWidth;
				}
				break;
		}

		let positionX = event.x;
		if (widget.type === 'Text' && (positionX + widgetDom.clientWidth) > this.maxRigth) {
			let reduceWidth = positionX + widgetDom.clientWidth - this.maxRigth;
			reduceWidth = widgetDom.clientWidth - reduceWidth;
			this.renderer2.setStyle(widgetDom, 'width', `${reduceWidth - 1}px`);
		} else {
			this.renderer2.setStyle(widgetDom, 'width', `auto`);
		}


		widget.position = event;
		console.log(this.zplService.widgetList);
	}

	initPage(type: string, value: number) {
		if (type === 'width' && value > 120) {
			value = 120;
		}
		if (type === 'width' && value < 40) {
			value = 40;
		}
		this.pageStyle[type] = value;
	}

	setMaxScale(widgetType) {
		switch (widgetType) {
			case 'Text':
				return 1;
			case 'Qrcode':
			case 'Barcode':
				return 55.6 / this.pageStyle.width
		}
	}
}
