import { ZPLModal } from "./zpl.modal";
export class TextModal extends ZPLModal {
  type: string = 'Text';
  name: string = '自定义';
  constructor(config?: any) {
    super(config);
    this.position || (this.position = {
      x: 0,
      y: 0
    });
    this.width || (this.width = 100);
    this.customFeature || (this.customFeature = {
      fontSize: 24,
      fontType: "Arial",
    });
  }

  toZPL() {
    return `^FO${this.position['x']},${this.position['y']}^FD${this.name}^FS`
  }

}