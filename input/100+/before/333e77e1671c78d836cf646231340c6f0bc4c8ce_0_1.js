function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom;


      x   .domain(xDomain || d3.extent(data[0].values, getX ))
          .range([0, availableWidth]);

      y   .domain(yDomain || d3.extent(data[0].values, getY )) //Should 0 always be forced in bar charts?
          .range([availableHeight, 0]);
          //.nice(); // remove for consistency?


      var parent = d3.select(this)
          .on('click', function(d,i) {
            dispatch.chartClick({
                data: d,
                index: i,
                pos: d3.event,
                id: id
            });
          });


      var wrap = d3.select(this).selectAll('g.wrap.bar').data([data[0].values]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 bar');
      var gEnter = wrapEnter.append('g');

      gEnter.append('g').attr('class', 'bars');


      wrap.attr('width', width)
          .attr('height', height);

      var g = wrap.select('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      wrapEnter.append('defs').append('clipPath')
          .attr('id', 'chart-clip-path-' + id)
        .append('rect');
      wrap.select('#chart-clip-path-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      gEnter
          .attr('clip-path', clipEdge ? 'url(#chart-clip-path-' + id + ')' : '');

      var shiftWrap = gEnter.append('g').attr('class', 'shiftWrap');



      var bars = wrap.select('.bars').selectAll('.bar')
          .data(function(d) { return d });

      bars.exit().remove();


      var barsEnter = bars.enter().append('svg:rect')
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'bar negative' : 'bar positive'})
          .attr('fill', function(d,i) { return color[0]; })
          .attr('x', 0 )
          .attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
          .attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) })
          .on('mouseover', function(d,i) {
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
                point: d,
                series: data[0],
                pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
                pointIndex: i,
                seriesIndex: 0,
                e: d3.event
            });

          })
          .on('mouseout', function(d,i) {
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    point: d,
                    series: data[0],
                    pointIndex: i,
                    seriesIndex: 0,
                    e: d3.event
                });
          })
          .on('click', function(d,i) {
                dispatch.elementClick({
                    //label: d[label],
                    value: getY(d,i),
                    data: d,
                    index: i,
                    pos: [x(getX(d,i)), y(getY(d,i))],
                    e: d3.event,
                    id: id
                });
              d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
              dispatch.elementDblClick({
                  //label: d[label],
                  value: getY(d,i),
                  data: d,
                  index: i,
                  pos: [x(getX(d,i)), y(getY(d,i))],
                  e: d3.event,
                  id: id
              });
              d3.event.stopPropagation();
          });

      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'bar negative' : 'bar positive'})
          .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - x(.5)) + ',0)'; }) //TODO: this assumes that each bar is an integer apart, it shouldn't
          .attr('width', x(.9) ) //TODO: this assumes that each bar is an integar apart

      d3.transition(bars)
          .attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
          .attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) });
          //.order();  // not sure if this makes any sense for this model

    }