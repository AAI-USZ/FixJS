function order(orderType, price, volume, exchangeData) {



  // Init

  var clonedExchange = createExchange(exchangeData);

  var orderBook = clonedExchange[orderType];



  var oldVolume = orderBook.volumes[price];



  // Was there a trade? This occurs when a buy order matches with a sell

  // order or vice versa

  function getOpposite() {

    return (BUY == orderType) ? SELL: BUY;

  }

  function isTrade() {

    var opposite = clonedExchange[getOpposite()].prices.peek();

    return (BUY == orderType) ? price >= opposite : price <= opposite;

  }

  var trade = isTrade();



  // A trade means several things

  // 1. The existing order is not added to the book

  // 2. Matching orders on the other side of the book are wiped out

  // 3. Trades are returned in an array



  var remainingVolume = volume;

  var storePrice = true;

  

  if (trade) {



    var opposingBook = clonedExchange[BUY]

    if (orderType == BUY)

      opposingBook = clonedExchange[SELL]



    while (remainingVolume > 0 && Object.keys(opposingBook.volumes).length > 0) {

      var bestOpposingPrice = opposingBook.prices.peek();

      var bestOpposingVolume = opposingBook.volumes[bestOpposingPrice];

      // The order does not wipe out any price levels

      if (bestOpposingVolume > remainingVolume) {

        clonedExchange.trades.push({price:bestOpposingPrice, volume:remainingVolume});

        opposingBook.volumes[bestOpposingPrice] = opposingBook.volumes[bestOpposingPrice] - remainingVolume;

        remainingVolume = 0;

        storePrice = false;

      }

      // The order has wiped out the entire other side

      else {

        clonedExchange.trades.push({price:bestOpposingPrice, volume:opposingBook.volumes[bestOpposingPrice]});

        remainingVolume = remainingVolume - opposingBook.volumes[bestOpposingPrice];

        // Pop the best price from the heap

        opposingBook.prices.pop();

        delete opposingBook.volumes[bestOpposingPrice];

      }

    }

  }





  // We only need to store prices if they are new otherwise we get

  // duplicate prices

  if (!oldVolume && storePrice) clonedExchange[orderType].prices.push(price);



  var newVolume = remainingVolume;



  // Add to existing volume

  if (oldVolume) newVolume += oldVolume;

  if (newVolume > 0)

    orderBook.volumes[price] = newVolume;

  return clonedExchange;



}