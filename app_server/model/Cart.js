module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id, qty=1) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
    storedItem.qty += qty;
    storedItem.price = storedItem.item._price * storedItem.qty;
    this.totalQty += qty;
    this.totalPrice += storedItem.item._price;
  }

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };

  this.delete = function(id, qty) {
    var storedItem = this.items[id];
    if (storedItem) {
      qty = Math.min(qty, storedItem.qty);
      storedItem.qty -= qty;
      lostPrice = storedItem.item._price * qty;
      storedItem.price -= lostPrice;
      this.totalQty -= qty;
      this.totalPrice -= lostPrice;
      if (storedItem.qty === 0)
        delete this.items[id];
    }
  }
};