function(customer, cart) {
  var _this = this;
  this.customer = customer;
  this.cart = cart;
  return $('.shopping_cart').bind('click', function(event) {
    return _this.customer.purchase(_this.cart);
  });
}