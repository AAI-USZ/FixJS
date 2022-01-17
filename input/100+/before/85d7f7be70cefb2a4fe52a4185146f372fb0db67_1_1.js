function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      var dataBars = data.filter(function(d) { return !d.disabled && d.bar });

      var dataLines = data.filter(function(d) { return !d.disabled && !d.bar });



      //TODO: try to remove x scale computation from this layer

      var series1 = data.filter(function(d) { return !d.disabled && d.bar })
            .map(function(d) { 
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i) }
              })
            });

      var series2 = data.filter(function(d) { return !d.disabled && !d.bar })
            .map(function(d) { 
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i) }
              })
            });

      x   .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
          .range([0, availableWidth]);


      lines
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }))

      bars
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }))


      var wrap = d3.select(this).selectAll('g.wrap.linePlusBar').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 linePlusBar').append('g');

      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y1 axis');
      gEnter.append('g').attr('class', 'y2 axis');
      gEnter.append('g').attr('class', 'barsWrap');
      gEnter.append('g').attr('class', 'linesWrap');
      gEnter.append('g').attr('class', 'legendWrap');
	  gEnter.append('g').attr('class', 'controlsWrap');



      var g = wrap.select('g');


      if (showLegend) {
        legend.width(availableWidth);

        g.select('.legendWrap')
            .datum(data.map(function(series) {
			  // Instead of dynamically setting the series, we should just add another field that just indicates left or right
			  series.position = (series.bar ? ' (left axis)' : ' (right axis)');
			  
			  //console.log(series);	
              //series.key = series.key + (series.bar ? ' (left axis)' : ' (right axis)'); /* instead of adding, we need to SET */ 
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.legendWrap')
          .attr('transform', 'translate(0,' + (-margin.top) +')');
      }

	  if (showControls) {
        controls.width(180).color(['#444', '#444', '#444']);
        g.select('.controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      var barsWrap = g.select('.barsWrap')
          .datum(dataBars.length ? dataBars : [{values:[]}])

      var linesWrap = g.select('.linesWrap')
          .datum(dataLines.length ? dataLines : [{values:[]}])


      d3.transition(barsWrap).call(bars);
      d3.transition(linesWrap).call(lines);


      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      xAxis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + y1.range()[0] + ')');
      d3.transition(g.select('.x.axis'))
          .call(xAxis);


      yAxis1
        .ticks( availableHeight / 36 )
        .tickSize(-availableWidth, 0);

      d3.transition(g.select('.y1.axis'))
          .call(yAxis1);


      yAxis2
        .ticks( availableHeight / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

      g.select('.y2.axis')
          .attr('transform', 'translate(' + x.range()[1] + ',0)');

      d3.transition(g.select('.y2.axis'))
          .call(yAxis2);



      legend.dispatch.on('legendClick', function(d,i) { 
        d.disabled = !d.disabled;

        if (!data.filter(function(d) { return !d.disabled }).length) {
          data.map(function(d) {
            d.disabled = false;
            wrap.selectAll('.series').classed('disabled', false);
            return d;
          });
        }

        selection.transition().call(chart);
      });

	  controls.dispatch.on('legendClick', function(d,i) { 
        if (!d.disabled) return;
        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        switch (d.key) {
          case 'Grouped':
            bars.stacked(false);
            break;
          case 'Stacked':
            bars.stacked(true);
            break;
        }

        selection.transition().call(chart);
      });

      lines.dispatch.on('elementMouseover.tooltip', function(e) {
        e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });
      if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

      lines.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });
      if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


      bars.dispatch.on('elementMouseover.tooltip', function(e) {
        e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });
      if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

      bars.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });
      if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


      chart.update = function() { selection.transition().call(chart) };
      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

    }