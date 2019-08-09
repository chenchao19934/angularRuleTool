import { ZPLModal } from "./zpl.modal";
export class BarcodeModal extends ZPLModal {
  type: string = 'Barcode';
  constructor(config?: any) {
    super(config);
    this.customFeature || (this.customFeature = {})
  }
  toZPL() {
    return "^FO" + this.position['x'] + "," + this.position['y'] + "^BY1^B3N,N," + this.height + ",N,N^FS";
  }
}