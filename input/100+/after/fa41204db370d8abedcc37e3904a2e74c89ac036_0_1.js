function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      discretebar
        .width(availableWidth)
        .height(availableHeight);


      var wrap = container.selectAll('g.wrap.discreteBarWithAxes').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 discreteBarWithAxes').append('g');
      var defsEnter = gEnter.append('defs');

      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y axis');
      gEnter.append('g').attr('class', 'barsWrap');



      var g = wrap.select('g');


      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var barsWrap = g.select('.barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))


      d3.transition(barsWrap).call(discretebar);


      defsEnter.append('clipPath')
          .attr('id', 'x-label-clip-' + discretebar.id())
        .append('rect')

      g.select('#x-label-clip-' + discretebar.id() + ' rect')
          .attr('width', x.rangeBand() * (staggerLabels ? 3 : 1))
          .attr('height', 16)
          .attr('x', -x.rangeBand() / (staggerLabels ? 0.9 : 2 ));


      xAxis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + (y.range()[0] + (discretebar.showValues() ? 16 : 0)) + ')')
      //d3.transition(g.select('.x.axis'))
      g.select('.x.axis').transition().duration(0)
          .call(xAxis);


      var xTicks = g.select('.x.axis').selectAll('g');

      if (staggerLabels)
        xTicks
            .selectAll('text')
            //.attr('transform', function(d,i,j) { return 'translate(0,' + (j % 2 == 0 ? '0' : '12') + ')' })
			// no staggering

      if (rotateLabels)
        xTicks
            .selectAll('text')
            .attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
            .attr('text-anchor', 'end') //TODO: figure out why this gets changed to middle, and fix this

      xTicks
          .selectAll('text')
          .attr('clip-path', function(d,i,j) { return rotateLabels ? '' : 'url(#x-label-clip-' + discretebar.id() + ')' });


      yAxis
        .ticks( availableHeight / 36 )
        .tickSize( -availableWidth, 0);

      d3.transition(g.select('.y.axis'))
          .call(yAxis);


      discretebar.dispatch.on('elementMouseover.tooltip', function(e) {
        e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });
      if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

      discretebar.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });
      if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


      //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
      chart.update = function() { selection.transition().call(chart); };
      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

    }