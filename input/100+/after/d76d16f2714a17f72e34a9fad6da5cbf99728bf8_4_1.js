function(req, res, next){
    // place the order and then let's go home. Looooong day :)

    try{
      var billingAddress = new req._ordrin.Address(req.body.addr, req.body.city, req.body.state, req.body.zip, 
                                                   String(req.body.phone));
      var creditCard = new req._ordrin.CreditCard(req.body.name, req.body.expiryMonth, req.body.expiryYear,
                                                  billingAddress, req.body.number, req.body.cvc)
      req.session.eventAddress.phone = billingAddress.phone;
    }catch(e){
      console.log("credit card issue", e);
      return next(400);
    }

    var tray = req.session.tray;
    console.log("tray", tray);
    var items = [];
    for (var item in tray){
      console.log(item, "item", typeof tray[item]);
      var options = [];
      for (var order in tray[item]){
        var currentItem = tray[item][order];
        console.log("current item", currentItem);
        for (var j = 0; j < currentItem.options.length; j++){
          options.push(currentItem.options[j].id);
        }
        item = new req._ordrin.TrayItem(currentItem.id, currentItem.quantity, options);
        items.push(item);
      }
    }
    var tray = new req._ordrin.Tray(items);
    console.log(req.session.time);
    var user = new req._ordrin.UserLogin(req.session.email, false);
    req._ordrin.order.placeOrder(req.session.rid, tray, 0, new Date(req.session.time), req.body.name.split(" ")[0], req.body.name.split(" ")[1],
                                 req.session.eventAddress, creditCard, user, false, function(err, data){
                                   console.log("placed order");
                                   if (err){
                                     console.log("so close", err);
                                     return next(500);
                                   }
                                   console.log("Fuck yeah", data);
                                   //response.render("Order/success.jade");
                                 });
  }