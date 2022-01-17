function isTrade() {

    var opposite = clonedExchange[getOpposite()].prices.peek();

    return (BUY == orderType) ? price >= opposite : price <= opposite;

  }