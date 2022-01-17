function onBrush() {
        //nv.log(brush.empty(), brush.extent(), xi(brush.extent()[0]), xi(brush.extent()[1]));

        var extent = brush.empty() ? xi.domain() : brush.extent();

            /*

        wrap.select('#brushBackground-clip-' + id +' rect.center')
            .attr('x', x3(extent[0]))
            .attr('width', x3(extent[1]) - x3(extent[0]));

        wrap.select('#brushBackground-clip-' + id + ' rect.left')
            .attr('width',  xi(extent[0]) - x.range()[0])

        wrap.select('#brushBackground-clip-' + id + ' rect.right')
            .attr('x', xi(extent[1]))
            .attr('width', x.range()[1] - xi(extent[1]));
           */

        g.select('.brushBackground rect.center')
            .attr('x', x3(extent[0]))
            .attr('width', x3(extent[1]) - x3(extent[0]));

        g.select('.brushBackground rect.left')
            .attr('width',  xi(extent[0]) - x.range()[0])

        g.select('.brushBackground rect.right')
            .attr('x', xi(extent[1]))
            .attr('width', x.range()[1] - xi(extent[1]));

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

      }