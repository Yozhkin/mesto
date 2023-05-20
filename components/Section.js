export default class Section {
  constructor( {items, renderer}, selector) {
    this._container = document.querySelector(selector);
    this._items = items;
    this.renderer = renderer;
  };

  addCard() {
    this._items.forEach(element => {
      this.addItem(this.renderer(element))
    });
  };

  addItem(element) {
    this._container.prepend(element);
  }
}
