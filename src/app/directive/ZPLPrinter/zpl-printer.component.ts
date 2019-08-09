import { Component, OnInit, OnDestroy, Input, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { ZplService } from "./zpl-printer.service";

@Component({
	selector: 'zpl-printer',
	templateUrl: './zpl-printer.component.html',
	styleUrls: ['./zpl-printer.component.css'],
	providers: [ZplService]
})

export class ZplPrinterComponent implements OnInit, OnDestroy, AfterViewInit {
	public self: HTMLElement;
	public inBounds = true;
	public myOutOfBounds = { top: false, bottom: true, right: true, left: false };

	public pageStyle = {
		width: 70,
		height: 40
	}

	constructor(el: ElementRef, public zplService: ZplService, ) {
		this.self = el.nativeElement;
	}

	ngOnInit(): void { }
	ngAfterViewInit(): void { }
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

	changePosition(event, widget) {
		console.log(event);
		widget.position = event;
		console.log(this.zplService.widgetList);
	}

	initPage(type: string, value: number) {
		this.pageStyle[type] = value;
	}
}
