function isTrade() {

    var opp = cloned[getOpposite()].prices.peek();

    return (BUY == orderType) ? price >= opp : price <= opp;

  }