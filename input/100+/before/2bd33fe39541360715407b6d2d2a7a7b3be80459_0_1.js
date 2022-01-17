function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom;

      //store old scales if they exist
      x0 = x0 || x;
      y0 = y0 || y;

      if (stacked) {
      //var stackedData = d3.layout.stack()
        data = d3.layout.stack()
                     .offset('zero')
                     .values(function(d){ return d.values })
                     .y(getY)
                     (data);
      }



      //add series index to each data point for reference
      data = data.map(function(series, i) {
        series.values = series.values.map(function(point) {
          point.series = i;
          return point;
        });
        return series;
      });


      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) { 
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
              })
            });

      x   .domain(d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands([0, availableWidth], .1);

      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y0 : 0) }).concat(forceY)))
          .range([availableHeight, 0]);



      var wrap = d3.select(this).selectAll('g.wrap.multibar').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 multibar');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');

      gEnter.append('g').attr('class', 'groups');

      var g = wrap.select('g')
      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



      defsEnter.append('clipPath')
          .attr('id', 'edge-clip-' + id)
        .append('rect');
      wrap.select('#edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#edge-clip-' + id + ')' : '');



      var groups = wrap.select('.groups').selectAll('.group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      d3.transition(groups.exit())
          //.style('stroke-opacity', 1e-6)
          //.style('fill-opacity', 1e-6)
        .selectAll('rect.bar')
        .delay(function(d,i) { return i * delay/ data[0].values.length })
          .attr('y', function(d) { return stacked ? y0(d.y0) : y0(0) })
          .attr('height', 0)
          .remove();
      groups
          .attr('class', function(d,i) { return 'group series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color[i % color.length] })
          .style('stroke', function(d,i){ return color[i % color.length] });
      d3.transition(groups)
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('rect.bar')
          .data(function(d) { return d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('rect')
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'bar negative' : 'bar positive'})
          .attr('x', function(d,i,j) {
              return stacked ? 0 : (j * x.rangeBand() / data.length )
          })
          .attr('y', function(d) { return y0(stacked ? d.y0 : 0) })
          .attr('height', 0)
          .attr('width', x.rangeBand() / (stacked ? 1 : data.length) )
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });
      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'bar negative' : 'bar positive'})
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
      if (stacked)
        d3.transition(bars)
            .delay(function(d,i) { return i * delay / data[0].values.length })
            .attr('y', function(d,i) {
              return y(getY(d,i) + (stacked ? d.y0 : 0));
            })
            .attr('height', function(d,i) {
              return Math.abs(y(d.y + (stacked ? d.y0 : 0)) - y((stacked ? d.y0 : 0)))
            })
            .each('end', function() {
              d3.transition(d3.select(this))
                .attr('x', function(d,i) {
                  return stacked ? 0 : (d.series * x.rangeBand() / data.length )
                })
                .attr('width', x.rangeBand() / (stacked ? 1 : data.length) );
            })
      else
        d3.transition(bars)
          .delay(function(d,i) { return i * delay/ data[0].values.length })
            .attr('x', function(d,i) {
              return d.series * x.rangeBand() / data.length
            })
            .attr('width', x.rangeBand() / data.length)
            .each('end', function() {
              d3.transition(d3.select(this))
                .attr('y', function(d,i) {
                  return getY(d,i) < 0 ?
                    y(0) :
                    y(getY(d,i)) 
                })
                .attr('height', function(d,i) {
                  return Math.abs(y(getY(d,i)) - y(0))
                });
            })



      //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
      chart.update = function() { chart(selection) };

      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    }