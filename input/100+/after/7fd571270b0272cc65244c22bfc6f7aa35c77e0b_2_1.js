function submitRandomOrder() {
  
  // order
  var ord = nocklib.generateRandomOrder(exchangeData); 
  console.log('order', ord);
  if (ord.type == exch.BUY)
    exchangeData = exch.buy(ord.price, ord.volume, exchangeData);
  else  
    exchangeData = exch.sell(ord.price, ord.volume, exchangeData);  
    
  var pause = Math.floor(Math.random() * timeRange) + timeFloor;
  setTimeout(submitRandomOrder, pause);
  console.log(exch.getDisplay(exchangeData)); 
}