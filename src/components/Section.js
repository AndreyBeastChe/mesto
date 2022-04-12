export class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._selector = selector;
  }
  addItem(element) {
    this._selector.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }
}
