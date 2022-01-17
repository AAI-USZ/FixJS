function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;


      var wrap = container.selectAll('g.wrap.line').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 line');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      gEnter.append('g').attr('class', 'groups');
      gEnter.append('g').attr('class', 'scatterWrap');

      var scatterWrap = wrap.select('.scatterWrap');//.datum(data);


      scatter
        .width(availableWidth)
        .height(availableHeight)

      d3.transition(scatterWrap).call(scatter);



      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      defsEnter.append('clipPath')
          .attr('id', 'edge-clip-' + id)
        .append('rect');

      wrap.select('#edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#edge-clip-' + id + ')' : '');
      scatterWrap
          .attr('clip-path', clipEdge ? 'url(#edge-clip-' + id + ')' : '');




      var groups = wrap.select('.groups').selectAll('.group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      d3.transition(groups.exit())
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'group series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color[i % color.length] })
          .style('stroke', function(d,i){ return color[i % color.length] });
      d3.transition(groups)
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);


      var paths = groups.selectAll('path')
          .data(function(d, i) { return [d.values] });
      paths.enter().append('path')
          .attr('class', 'line')
          .attr('d', d3.svg.line()
        	.interpolate(interpolate)
            .x(function(d,i) { return x0(getX(d,i)) })
            .y(function(d,i) { return y0(getY(d,i)) })
          );
      d3.transition(groups.exit().selectAll('path'))
          .attr('d', d3.svg.line()
        	.interpolate(interpolate)
            .x(function(d,i) { return x(getX(d,i)) })
            .y(function(d,i) { return y(getY(d,i)) })
          );
      d3.transition(paths)
          .attr('d', d3.svg.line()
        	.interpolate(interpolate)
            .x(function(d,i) { return x(getX(d,i)) })
            .y(function(d,i) { return y(getY(d,i)) })
          );


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    }