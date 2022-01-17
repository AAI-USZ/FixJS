function(req, res, next){
  if (req.session.cart == undefined){
    cartProvider.newCart(function(err,cart){
      req.session.cart = cart
    });
  }
  return next()
}