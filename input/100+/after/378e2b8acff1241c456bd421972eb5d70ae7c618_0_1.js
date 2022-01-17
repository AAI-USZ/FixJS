function(data) {
    var info = data.value.items[0];

    //nv.log(info);
    if (typeof info == 'undefined' || info.StockValue == 0) return;

    d3.select('#stockName').text(info.StockName);
    //d3.select('#stockSymbol').text(info.Symbol);
    d3.select('#stockValue').text(info.StockValue);
    d3.select('#stockChange')
        .text(info.Change)
        .style('color', parseFloat(info.Change) > 0 ? 'green' : 'red' );
    d3.select('#stockChangePercent')
        .text(d3.format('.2%')(parseInt(info.Change) / info.StockValue))
        .style('color', parseFloat(info.Change) > 0 ? 'green' : 'red' );
    d3.select('#stockDate')
        .text(d3.time.format('%b %e %Y')(info.Date));

  }