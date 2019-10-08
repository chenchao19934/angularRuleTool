import { ZPLModal } from "./zpl.modal";
export class TextModal extends ZPLModal {
  type: string = 'Text';
  name: string = '文本';
  // 字体打印方向H（水平）V（垂直）R（反向）
  direction: string;
  constructor(config?: any) {
    super(config);
    this.content = (this.content = '###'),
    this.direction = (this.direction = 'H'),
    this.position || (this.position = {
      x: 0,
      y: 0
    });
    this.width || (this.width = 100);
    this.customFeature || (this.customFeature = {
      fontSize: 24,
      lineHeight: 1,
      showTitle: true
    });
  }

  toZPL() {
    return `^FO${this.position['x']},${this.position['y']}^FD${this.name}^FS`
  }

}