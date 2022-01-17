function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom;



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

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands([0, availableWidth], .1);

      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y }).concat(forceY)))
          //.range([availableHeight, 0]);


      if (showValues) y.range([availableHeight - (y.domain()[0] < 0 ? 12 : 0), y.domain()[1] < 0 ? 0 : 12]);
      else y.range([availableHeight, 0]);

      //store old scales if they exist
      x0 = x0 || x; //TODO: decide whether or not to keep
      y0 = y0 || d3.scale.linear().domain(y.domain()).range([y(0),y(0)]);

      var wrap = d3.select(this).selectAll('g.wrap.discretebar').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 discretebar');
      var gEnter = wrapEnter.append('g');

      gEnter.append('g').attr('class', 'groups');

      var g = wrap.select('g')
      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');





      //TODO: by definiteion, the discrete bar should not have multiple groups, will modify/remove later
      var groups = wrap.select('.groups').selectAll('.group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
      d3.transition(groups.exit())
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'group series-' + i })
          .classed('hover', function(d) { return d.hover })
      d3.transition(groups)
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('g.bar')
          .data(function(d) { return d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('g')
          .attr('transform', function(d,i,j) {
              return 'translate(' + x(getX(d,i)) + ', ' + y(0) + ')' 
          })
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
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
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
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
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });

      barsEnter.append('rect')
          .attr('height', 0)
          .attr('width', x.rangeBand() / data.length )
          .style('fill', function(d,i){  return d.color || color[i % color.length] }) //this is a 'hack' to allow multiple colors in a single series... will need to rethink this methodology
          .style('stroke', function(d,i){ return d.color || color[i % color.length] })

      if (showValues) {
        barsEnter.append('text')
          .attr('text-anchor', 'middle')
        bars.selectAll('text')
          .attr('x', x.rangeBand() / 2)
          .attr('y', function(d,i) { return getY(d,i) < 0 ? y(getY(d,i)) - y(0) + 12 : -4 })
          .text(function(d,i) { return valueFormat(getY(d,i)) })
      } else {
        bars.selectAll('text').remove();
      }

      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'bar negative' : 'bar positive'})
          //.attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
          .attr('transform', function(d,i) {
              return 'translate(' + x(getX(d,i)) + ', ' + (getY(d,i) < 0 ? y0(0) : y0(getY(d,i))) + ')' 
          })
        .selectAll('rect')
          .attr('width', x.rangeBand() / data.length)
      d3.transition(bars)
        //.delay(function(d,i) { return i * 1200 / data[0].values.length })
          .attr('transform', function(d,i) {
              return 'translate(' + x(getX(d,i)) + ', ' + (getY(d,i) < 0 ? y(0) : y(getY(d,i))) + ')' 
          })
        .selectAll('rect')
          //.attr('width', x.rangeBand() / data.length)
          .attr('height', function(d,i) {
             return Math.abs(y(getY(d,i)) - y(0))
           });




      //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
      chart.update = function() {
        selection.transition().call(chart);
      }

      //store old scales for use in transitions on update, to animate from old to new positions, and sizes
      x0 = x.copy();
      y0 = y.copy();

    }