import { Component, OnInit, OnDestroy, Input, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
	selector: 'rule-line',
	templateUrl: './rule.component.html',
	styleUrls: ['./rule.component.css']
})

export class RuleToolComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input('position') position: string = 'relative';
	@Input('isHotKey') isHotKey: boolean = true;
	@Input('isScaleRevise') isScaleRevise: boolean = false;
	@Input('presetLine') presetLine: Array<any> = [];
	@Input('contentLayout') contentLayout: Object = { top: 50, left: 50 };
	@HostListener('mousemove', ['$event']) mousemove($event) { 
		this.dottedLineMove($event); 
	}
	@HostListener('mouseup', ['$event']) mouseup($event) { 
		this.dottedLineUp($event); 
	}
	@HostListener('window:keyup', ['$event']) keyup($event) {
		this.keyboard($event); 
	}
	@HostListener('window:resize') onResize() {
		this.xScale = [];
		this.yScale = [];
		this.init();
	}

	public windowWidth: number = 0; // 窗口宽度
	public windowHeight: number = 0; // 窗口高度
	public xScale: Array<any> = []; // 水平刻度
	public yScale: Array<any> = []; // 垂直刻度
	public topSpacing: number = 0; // 标尺与窗口上间距
	public leftSpacing: number = 0; //  标尺与窗口左间距
	public isDrag: boolean = false;
	public dragFlag = ''; // 拖动开始标记，可能值x(从水平标尺开始拖动);y(从垂直标尺开始拖动)
	public levelLineList = []; // 生成的水平线列表
	public verticalLineList = []; // 生成的垂直线列表
	public levelDottedLeft: any = -2; // 水平虚线位置
	public verticalDottedTop: any = -2; // 垂直虚线位置
	public rulerWidth: number = 0; // 垂直标尺的宽度
	public rulerHeight: number = 0; // 水平标尺的高度
	public dragLineId = ''; // 被移动线的ID
	public keyCode = { r: 72 };
	public rulerToggle: boolean = true // 标尺辅助线显示开关
	public self:any;

	constructor(el:ElementRef) { 
		this.self = el.nativeElement;
	}

	ngOnInit(): void {
		this.init();
		this.quickGeneration(this.presetLine);// 生成预置参考线
	}
	
	ngAfterViewInit(): void { }

	ngOnDestroy(): void { }

	init() {
		this.box();
		this.scaleCalc();
	}
	/**
	 * 获取窗口宽与高
	 */
	box() {
		if (this.isScaleRevise) { // 根据内容部分进行刻度修正
			const content = this.self.querySelector('#contentRule');
			const contentLeft = content.offsetLeft || 1280;
			const contentTop = content.offsetTop || 1000;
			for (let i = 0; i < contentLeft; i += 1) {
				if (i % 50 === 0 && i + 50 <= contentLeft) {
					this.xScale.push({ id: i });
				}
			}
			for (let i = 0; i < contentTop; i += 1) {
				if (i % 50 === 0 && i + 50 <= contentTop) {
					this.yScale.push({ id: i });
				}
			}
		}
		this.windowWidth = document.documentElement.clientWidth - this.leftSpacing;
		this.windowHeight = document.documentElement.clientHeight - this.topSpacing;
		this.rulerWidth = this.self.querySelector('#verticalRuler').offsetWidth;
		this.rulerHeight = this.self.querySelector('#levelRuler').offsetHeigth;
		this.leftSpacing = this.self.querySelector('#verticalRuler').offsetParent.offsetLeft || 0;
		this.topSpacing = this.self.querySelector('#levelRuler').offsetParent.offsetTop || 0;
	}
	/**
	 * 计算刻度
	 */
	scaleCalc() {
		for (let i = 0; i < this.windowWidth; i += 1) {
			if (i % 50 === 0) {
				this.xScale.push({ id: i });
			}
		}
		for (let i = 0; i < this.windowHeight; i += 1) {
			if (i % 50 === 0) {
				this.yScale.push({ id: i });
			}
		}
	}
	/**
	 * 水平参考线
	 */
	newLevelLine() {
		this.isDrag = !this.isDrag;
		this.dragFlag = 'x';
	}
	/**
	 * 垂直参考线
	 */
	newVerticalLine() {
		this.isDrag = !this.isDrag;
		this.dragFlag = 'y';
	}
	/**
	 * 虚线移动
	 * @param $event
	 */
	dottedLineMove($event) {
		switch (this.dragFlag) {
			case 'x':
				if (this.isDrag) {
					this.verticalDottedTop = $event.pageY - this.topSpacing;
				}
				break
			case 'y':
				if (this.isDrag) {
					this.levelDottedLeft = $event.pageX - this.leftSpacing;
				}
				break
			case 'l':
				if (this.isDrag) {
					this.verticalDottedTop = $event.pageY - this.topSpacing;
				}
				break
			case 'v':
				if (this.isDrag) {
					this.levelDottedLeft = $event.pageX - this.leftSpacing;
				}
				break
			default:
				break
		}
	}
	/**
	 * 虚线松开
	 * @param $event 
	 */
	dottedLineUp($event) {
		if (this.isDrag) {
			this.isDrag = false;
			switch (this.dragFlag) {
				case 'x':
					this.levelLineList.push(
						{
							id: 'levelLine' + this.levelLineList.length + 1,
							title: $event.pageY + 1 - this.topSpacing + 'px',
							top: $event.pageY - this.topSpacing + 1
						}
					)
					break
				case 'y':
					this.verticalLineList.push(
						{
							id: 'verticalLine' + this.verticalLineList.length + 1,
							title: $event.pageX + 1 - this.leftSpacing + 'px',
							left: $event.pageX - this.leftSpacing + 1
						}
					)
					break
				case 'l':
					if ($event.pageY - this.topSpacing < this.rulerHeight) {
						let Index, id;
						this.levelLineList.forEach((item, index) => {
							if (item.id === this.dragLineId) {
								Index = index;
								id = item.id;
							}
						})
						this.levelLineList.splice(Index, 1, {
							id: id,
							title: -600 + 'px',
							top: -600
						})
					} else {
						let Index, id;
						this.levelLineList.forEach((item, index) => {
							if (item.id === this.dragLineId) {
								Index = index;
								id = item.id;
							}
						})
						this.levelLineList.splice(Index, 1, {
							id: id,
							title: $event.pageY + 1 - this.topSpacing + 'px',
							top: $event.pageY - this.topSpacing + 1
						})
					}
					break
				case 'v':
					if ($event.pageX - this.leftSpacing < this.rulerWidth) {
						let Index, id;
						this.verticalLineList.forEach((item, index) => {
							if (item.id === this.dragLineId) {
								Index = index;
								id = item.id;
							}
						})
						this.verticalLineList.splice(Index, 1, {
							id: id,
							title: -600 + 'px',
							left: -600
						})
					} else {
						let Index, id;
						this.verticalLineList.forEach((item, index) => {
							if (item.id === this.dragLineId) {
								Index = index;
								id = item.id;
							}
						})
						this.verticalLineList.splice(Index, 1, {
							id: id,
							title: $event.pageX + 1 - this.leftSpacing + 'px',
							left: $event.pageX - this.leftSpacing + 1
						})
					}
					break
				default:
					break
			}
			this.verticalDottedTop = this.levelDottedLeft = -10;
		}
	}
	/**
	 * 水平标尺处按下鼠标
	 * @param event 
	 */
	levelDragRuler(event) {
		event.stopPropagation();
		this.newLevelLine();
	}
	/**
	 * 垂直标尺处按下鼠标
	 * @param event 
	 */
	verticalDragRuler(event) {
		event.stopPropagation();
		this.newVerticalLine();
	}
	/**
	 * 水平线处按下鼠标
	 * @param id 水平线标识
	 */
	dragLevelLine(id) {
		this.isDrag = true;
		this.dragFlag = 'l';
		this.dragLineId = id;
	}
	/**
	 * 垂直线处按下鼠标
	 * @param id 垂直线标识
	 */
	dragVerticalLine(id) {
		this.isDrag = true;
		this.dragFlag = 'v';
		this.dragLineId = id;
	}
	/**
	 * 键盘事件
	 * @param $event 
	 */
	keyboard($event) {
		if (this.isHotKey) {
			switch ($event.keyCode) {
				case this.keyCode.r:
					this.rulerToggle = !this.rulerToggle
					break
				case 46:
					this.deleteGeneration();
					break
			}
		}
	}
	/**
	 * 预先生成参考线
	 * @param params 
	 */
	quickGeneration(params) {
		if (params) {
			params.forEach(item => {
				switch (item.type) {
					case 'l':
						this.levelLineList.push({
							id: 'levelLine' + this.levelLineList.length + 1,
							title: item.site + 'px',
							top: item.site
						})
						break
					case 'v':
						this.verticalLineList.push({
							id: 'verticalLine' + this.verticalLineList.length + 1,
							title: item.site + 'px',
							left: item.site
						})
						break
					default:
						break
				}
			})
		}
	}
	/**
	 * 删除参考线
	 */
	deleteGeneration() {
		if (this.dragLineId !== '') {
			if (this.dragLineId.indexOf('level') >= 0) {
				let index = this.levelLineList.findIndex((value)=> { 
					return value.id === this.dragLineId;
				});
				this.levelLineList.splice(index,1);
			}else {
				let index = this.verticalLineList.findIndex((value)=> { 
					return value.id === this.dragLineId;
				});
				this.verticalLineList.splice(index,1);
			}
			this.isDrag = false;
			this.dragLineId = '';
			this.verticalDottedTop = -2;
			this.levelDottedLeft = -2;
		}
	}
}
