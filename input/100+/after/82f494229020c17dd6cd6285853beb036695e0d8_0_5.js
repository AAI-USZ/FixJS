function() {
  var margin = {top: 10, right: 30, bottom: 25, left: 80},
      margin2 = {top: 0, right: 30, bottom: 5, left: 80},
      margin3 = {top: 0, right: 30, bottom: 20, left: 80},
      width = null,
      height = null,
      height2 = 80,
      height3 = 65,
      getX = function(d, i) { return i },
      getDX = function(d) { return d.x },
      getY = function(d) { return d.y },
      id = Math.floor(Math.random() * 10000), //Create semi-unique ID incase user doesn't select one
      color = d3.scale.category20().range(),
      showLegend = false,
      tooltips = true,
      tooltip = function(key, x, y, e, graph) {
        var high  = stocks.high()(e.point, e.pointIndex),
            low   = stocks.low()(e.point, e.pointIndex),
            open  = stocks.open()(e.point, e.pointIndex),
            close = stocks.close()(e.point, e.pointIndex);

        return '<h3>' + key + ' on ' + x + '</h3>' +
               '<p>Open ' + open + ', Close ' + close + '</p>' +
               '<p>High ' + high + ', Low ' + low + '</p>';
      };


  var stocks = nv.models.ohlcBar(),
      bars = nv.models.historicalBar(),
      lines = nv.models.line().interactive(false).isArea(true),
      //x = d3.scale.linear(), // needs to be both line and historicalBar x Axis
      x = stocks.xScale(),
      dx = d3.scale.ordinal(), // this is a lookup to get the right index (what we use for x positioning) from a date
      xi = d3.scale.linear().clamp(true),
      //x3 = lines.xScale(),
      x3 = d3.time.scale(),
      y1 = bars.yScale(),
      y2 = stocks.yScale(),
      y3 = lines.yScale(),
      xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
      xAxis2 = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
      //xAxis3 = nv.models.axis().scale(x3).orient('bottom').tickPadding(5),
      xAxis3 = d3.svg.axis().scale(x3).orient('bottom'),
      yAxis1 = nv.models.axis().scale(y1).orient('left'),
      yAxis2 = nv.models.axis().scale(y2).orient('left'),
      yAxis3 = nv.models.axis().scale(y3).orient('left'),
      legend = nv.models.legend().height(30),
      dispatch = d3.dispatch('tooltipShow', 'tooltipHide'),
      brush = d3.svg.brush().x(xi),
      drag = d3.behavior.drag();

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis2.tickFormat()(stocks.x()(e.point, e.pointIndex)),
        y = (e.series.bar ? yAxis1 : yAxis2).tickFormat()(stocks.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's');
  };



  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2 - height3,
          availableHeight2 = height2 - margin2.top - margin2.bottom,
          availableHeight3 = height3 - margin3.top - margin3.bottom;


      brush.on('brush', onBrush);
      drag.on('drag', onDrag);


      var dataBars = data.filter(function(d) { return !d.disabled && d.bar });

      var dataStocks = data.filter(function(d) { return !d.disabled && !d.bar });




      xi  .domain(d3.extent(dataStocks[0].values.map(function(d,i) {
                return getX(d,i)
            })))
          .range([0, availableWidth]);

      dx  .domain(dataStocks[0].values.map(getDX))
          .range(dataStocks[0].values.map(getX));

      x3  .domain(d3.extent(dataStocks[0].values, function(d) { return d.x })) //TODO make this take different accessor
          .range([0, availableWidth]);


      var wrap = container.selectAll('g.wrap.historicalStockChart').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 historicalStockChart');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');

      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'x2 axis');
      gEnter.append('g').attr('class', 'y1 axis');
      gEnter.append('g').attr('class', 'y2 axis');
      gEnter.append('g').attr('class', 'y3 axis');
      gEnter.append('g').attr('class', 'stocksWrap');
      gEnter.append('g').attr('class', 'barsWrap');
      gEnter.append('g').attr('class', 'linesWrap');
      gEnter.append('g').attr('class', 'x3 axis');
      gEnter.append('g').attr('class', 'brushBackground');
      //gEnter.append('g').attr('class', 'legendWrap');
      gEnter.append('g').attr('class', 'x brush');



      var g = wrap.select('g');
      var defs = g.select('defs');


      /*
      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.legendWrap')
            .datum(data.map(function(series) { 
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey;
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }
      */



      stocks
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }))

      lines
        .width(availableWidth)
        .height(availableHeight3)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }))

      bars
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }))



      var barsWrap = g.select('.barsWrap')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom) + ')')
          .datum(dataBars.length ? dataBars : [{values:[]}])

      var stocksWrap = g.select('.stocksWrap')
          .datum(dataStocks.length ? dataStocks : [{values:[]}])

      var linesWrap = g.select('.linesWrap')
          //.attr('mask', 'url(#brushBackground-clip-' + id + ')')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom + height2) + ')')
          .datum(dataStocks.length ? dataStocks : [{values:[]}])


      stocksWrap.selectAll('rect.dragTarget')
          .data([{x:0}])
        .enter().append('rect').attr('class', 'dragTarget')
          .attr('width', availableWidth)
          .attr('height', availableHeight + margin.bottom + height2)
          .call(drag)



      d3.transition(barsWrap).call(bars);
      d3.transition(stocksWrap).call(stocks);
      d3.transition(linesWrap).call(lines);

/*
      var brushClip = defsEnter.append('mask')
      //var brushClip = defsEnter.append('clipPath')
           .attr('id', 'brushBackground-clip-' + id)
         //.append('g')

      brushClip.append('rect')
          .attr('class', 'center')
          .attr('x', 0)
          .attr('y', 0)
          .style('fill', '#FFF')
          .style('fill-opacity', 1)
          .style('opacity', 1)
          .attr('height', availableHeight3);

      brushClip.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .style('fill', '#FFF')
          .style('fill-opacity', .5)
          .style('opacity', .5)
          .attr('height', availableHeight3);

      brushClip.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .style('fill', '#FFF')
          .style('fill-opacity', .5)
          .style('opacity', .5)
          .attr('height', availableHeight3);
          */


      wrap.select('#edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      var brushBG = g.select('.brushBackground')
          //.attr('mask', 'url(#brushBackground-clip-' + id + ')')
          //.attr('clip-path', 'url(#brushBackground-clip-' + id + ')')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom + height2) + ')');

/*
      brushBG.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          //.style('fill-opacity', 0)
          //.style('opacity', 0)
          .attr('width', availableWidth)
          .attr('height', availableHeight3);

      brushBG.append('rect')
          .attr('class', 'center')
          .attr('x', 0)
          .attr('y', 0)
          .style('fill-opacity', 0)
          .style('opacity', 0)
          .attr('height', availableHeight3);
*/

      brushBG.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight3);

      brushBG.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight3);

      //temporary setting brush to view half the data  TODO: remove this for something more intelligent (maybe always select 1 year range on start.. or let user decide)
      brush.extent([xi.domain()[1]/2, xi.domain()[1]]);

      gBrush = g.select('.x.brush')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom + height2) + ')')
          .call(brush);
      gBrush.selectAll('rect')
          //.attr('y', -5)
          .attr('height', availableHeight3);
      gBrush.selectAll(".resize").append("path").attr("d", resizePath);

      //temporary setting brush to view half the data, need to call to update background
      onBrush();


      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      xAxis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight2, 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom + availableHeight2 + margin2.top) + ')');
      d3.transition(g.select('.x.axis'))
          .call(xAxis);

      xAxis2
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.x2.axis')
          .attr('transform', 'translate(0,' + availableHeight + ')');
      d3.transition(g.select('.x2.axis'))
          .call(xAxis2);

      xAxis3
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight3, 0);

      g.select('.x3.axis')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom + height2 + availableHeight3 + margin3.top) + ')');
      d3.transition(g.select('.x3.axis'))
          .call(xAxis3);


      yAxis1
        .ticks( availableHeight2 / 36 )
        .tickSize(-availableWidth, 0)
        .width(margin2.left)
        .axisLabel('Volume (K)');

      g.select('.y1.axis')
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom) + ')');
      d3.transition(g.select('.y1.axis'))
          .style('opacity', dataBars.length ? 1 : 0)
          .call(yAxis1);


      yAxis2
        .ticks( availableHeight / 36 )
        .tickSize(-availableWidth, 0) // Show the y2 rules only if y1 has none
        .width(margin.left)
        .axisLabel('Price ($)');

      g.select('.y2.axis')
          .style('opacity', dataStocks.length ? 1 : 0)
          //.attr('transform', 'translate(' + x.range()[1] + ',0)');

      d3.transition(g.select('.y2.axis'))
          .call(yAxis2);

      yAxis3
        .ticks( availableHeight3 / 36 )
        .tickSize(-availableWidth, 0) // Show the y2 rules only if y1 has none
        .width(margin3.left)
        //.axisLabel('Price ($)');

      g.select('.y3.axis')
          .style('opacity', dataStocks.length ? 1 : 0)
          .attr('transform', 'translate(0,' + (availableHeight + margin.bottom + height2) + ')')

      d3.transition(g.select('.y3.axis'))
          .call(yAxis3);



      stocks.dispatch.on('elementMouseover.tooltip', function(e) {
        e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });
      if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

      stocks.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });
      if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


      bars.dispatch.on('elementMouseover.tooltip', function(e) {
        //e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
        e.pos = [e.pos[0] + margin2.left, e.pos[1] + availableHeight + margin.top + margin.bottom + margin2.top];
        dispatch.tooltipShow(e);
      });
      if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

      bars.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });
      if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


      chart.update = function() { selection.transition().call(chart) };
      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not



      // Taken from crossfilter (http://square.github.com/crossfilter/)
      function resizePath(d) {
        var e = +(d == "e"),
            x = e ? 1 : -1,
            y = availableHeight3 / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
      }


      function onDrag(d,i) {
        //nv.log(this, d3.event, d, i);
        //nv.log('xi', d3.event.dx);
        //nv.log('x', d.x);

        var extent = brush.extent();

        if (d3.event.dx < 0 && extent[1] >= xi.domain()[1]
         || d3.event.dx > 0 && extent[0] <= xi.domain()[0])
          return false;


        var ratio = (extent[1] - extent[0]) / (xi.domain()[1] - xi.domain()[0]);
        ///TODO: Drag distance should be based on the main data's resolution, not the brush window
        //       need to calculate xi correctly
        var newExtent = [
          xi.invert(xi(extent[0]) - d3.event.dx * ratio),
          xi.invert(xi(extent[1]) - d3.event.dx * ratio)
        ];

        //nv.log(xi.domain(), extent[0], xi(extent[0]), xi.invert(xi(extent[0])));

        brush.extent(newExtent);
        g.select('.x.brush').call(brush);
        onBrush();

      };


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




    });

    return chart;
  }

  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.stocks = stocks;
  chart.lines = lines;
  chart.bars = bars;
  chart.xAxis = xAxis;
  chart.xAxis2 = xAxis2;
  chart.xAxis3 = xAxis3;
  chart.yAxis1 = yAxis1;
  chart.yAxis2 = yAxis2;
  chart.yAxis3 = yAxis3;

  //d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
  d3.rebind(chart, stocks, 'getOpen', 'getClose', 'getHigh', 'getLow');

  //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile bars.x(lines.x()), etc.
  //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  //d3.rebind(chart, lines, 'interactive');
  //consider rebinding x and y as well

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    stocks.x(_);
    lines.x(_);
    bars.x(_);
    return chart;
  };

  chart.dx = function(_) {
    if (!arguments.length) return getDX;
    getDX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    stocks.y(_);
    lines.y(_);
    bars.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.margin2 = function(_) {
    if (!arguments.length) return margin2;
    margin2 = _;
    return chart;
  };

  chart.margin3 = function(_) {
    if (!arguments.length) return margin3;
    margin3 = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.height2 = function(_) {
    if (!arguments.length) return height2;
    height2 = _;
    return chart;
  };

  chart.height3 = function(_) {
    if (!arguments.length) return height3;
    height3 = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    legend.color(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };
  
  return chart;
}