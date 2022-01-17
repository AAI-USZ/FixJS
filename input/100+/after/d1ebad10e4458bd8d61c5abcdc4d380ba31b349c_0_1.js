function updateFocus() {
        //nv.log(brush.empty(), brush.extent(), x3(brush.extent()[0]), x3(brush.extent()[1]));

        var extent = brush.empty() ? x3.domain() : brush.extent();

            /*
        wrap.select('#brushBackground-clip-' + id + ' rect.center')
            .attr('x', x3(extent[0]))
            .attr('width', x3(extent[1]) - x3(extent[0]));
           */

        wrap.select('#brushBackground-clip-' + id + ' rect.left')
            .attr('width',  x3(extent[0]) - x3.range()[0])

        wrap.select('#brushBackground-clip-' + id + ' rect.right')
            .attr('x', x3(extent[1]))
            .attr('width', x3.range()[1] - x3(extent[1]));

        var stocksWrap = g.select('.stocksWrap')
            .datum(
              [{
                key: dataStocks[0].key,
                values: dataStocks[0].values.filter(function(d,i) {
                  return getX(d,i) > extent[0] && getX(d,i) < extent[1];
                })
              }]
            );


        var barsWrap = g.select('.barsWrap')
            .attr('transform', 'translate(0,' + (availableHeight + margin.bottom) + ')')
            .datum(
              [{
                key: dataBars[0].key,
                values: dataBars[0].values.filter(function(d,i) {
                  return getX(d,i) > extent[0] && getX(d,i) < extent[1];
                })
              }]
            );

        d3.transition(barsWrap).call(bars);
        d3.transition(stocksWrap).call(stocks);

        d3.transition(g.select('.x.axis'))
            .call(xAxis);
        d3.transition(g.select('.x2.axis'))
            .call(xAxis2);

        d3.transition(g.select('.y1.axis'))
            .call(yAxis1);
        d3.transition(g.select('.y2.axis'))
            .call(yAxis2);

        /*
        var yDomain = brush.empty() ? y3.domain() : d3.extent(d3.merge(dataStocks.map(function(d) { return d.values })).filter(function(d) {
          return lines.x()(d) >= brush.extent()[0] && lines.x()(d) <= brush.extent()[1];
        }), lines.y());  //This doesn't account for the 1 point before and the 1 point after the domain.  Would fix, but likely need to change entire methodology here

        if (typeof yDomain[0] == 'undefined') yDomain = y3.domain(); //incase the brush doesn't cover a single point


        x.domain(brush.empty() ? x3.domain() : brush.extent());
        y1.domain(yDomain);
       */

        //lines.xDomain(x.domain());
        //lines.yDomain(y1.domain());
      }