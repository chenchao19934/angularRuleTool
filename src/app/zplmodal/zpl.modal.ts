export class ZPLModal {
  public id: string;
  public type: string;
  public name: string;
  public title: string;
  public content: string;
  public width: number;
  public height: number;
  public position: object;
  public customFeature: any;

  constructor(config) {
    if (!!config) {
      this.id = config.id;
      this.type = config.type;
      this.name = config.name;
      this.title = config.title;
      this.content = config.content;
      this.position = config.position || {
        x: 0,
        y: 0
      };
      this.customFeature = config.customFeature;
    }
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}