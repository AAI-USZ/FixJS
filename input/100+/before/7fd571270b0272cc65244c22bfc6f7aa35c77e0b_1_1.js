function(exchangeData) {

    var order = {};

    if (Math.random() > 0.5)

      order.type = exchange.BUY

    else

      order.type = exchange.SELL

     

    var buyPriceExists = exchangeData.buys && exchangeData.buys.prices.peek();

    var sellPriceExists = exchangeData.sells && exchangeData.sells.prices.peek();

    

    if (!buyPriceExists && !sellPriceExists)

      order.price = Math.floor(Math.random() * priceRange) + priceFloor;

    else if (buyPriceExists && sellPriceExists) {

      if (Math.random() > 0.5)

        order.price = exchangeData.buys.prices.peek();

      else

        order.price = exchangeData.sells.prices.peek();

    } else if (buyPriceExists) {

      order.price = exchangeData.buys.prices.peek();

    } else {

      order.price = exchangeData.sells.prices.peek();

    }

  

    var shift = Math.floor(Math.random() * priceRange / 2);

    if (Math.random() > 0.5)

      order.price += shift;

    else

      order.price -= shift;

    order.volume = Math.floor(Math.random() * volumeRange) + volumeFloor

    return order;

  }