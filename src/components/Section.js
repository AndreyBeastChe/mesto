export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }
  addItem(element) {
    this._selector.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  renderItem(item) {
    this._renderer(item);
  }
}
