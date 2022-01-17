function order(orderType, price, volume, exchangeData) {



  // Init

  var cloned = createExchange(exchangeData);

  var orderBook = cloned[orderType];



  var oldVolume = orderBook.volumes[price];



  // Was there a trade? This occurs when a buy order matches with a sell

  // order or vice versa

  function getOpposite() {

    return (BUY == orderType) ? SELL: BUY;

  }

  function isTrade() {

    var opp = cloned[getOpposite()].prices.peek();

    return (BUY == orderType) ? price >= opp : price <= opp;

  }

  var trade = isTrade();



  // A trade means several things

  // 1. The existing order is not added to the book

  // 2. Matching orders on the other side of the book are wiped out

  // 3. Trades are returned in an array



  var remVol = volume;

  var storePrice = true;

  

  if (trade) {



    var oppBook = cloned[BUY]

    if (orderType == BUY)

      oppBook = cloned[SELL]



    while (remVol > 0 && Object.keys(oppBook.volumes).length > 0) {

      var bestOppPrice = oppBook.prices.peek();

      var bestOppVol = oppBook.volumes[bestOppPrice];

      // The order does not wipe out any price levels

      if (bestOppVol > remVol) {

        cloned.trades.push({price:bestOppPrice, volume:remVol});

        oppBook.volumes[bestOppPrice] = 

          oppBook.volumes[bestOppPrice] - remVol;

        remVol = 0;

        storePrice = false;

      }

      // The order has wiped out the entire other side

      else {

      	if (bestOppVol == remVol)

      	  storePrice = false;     	

        cloned.trades.push(

          {price:bestOppPrice

          , volume:oppBook.volumes[bestOppPrice]});

        remVol = remVol - oppBook.volumes[bestOppPrice];

        // Pop the best price from the heap

        oppBook.prices.pop();

        delete oppBook.volumes[bestOppPrice];

      }

    }

  }





  // We only need to store prices if they are new otherwise we get

  // duplicate prices

  if (!oldVolume && storePrice) 

    cloned[orderType].prices.push(price);



  var newVolume = remVol;



  // Add to existing volume

  if (oldVolume) newVolume += oldVolume;

  if (newVolume > 0)

    orderBook.volumes[price] = newVolume;

  return cloned;



}