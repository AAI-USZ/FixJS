function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.wrap.scatterChart').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 scatterChart chart-' + scatter.id());
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      // background for pointer events
      gEnter.append('rect')
          .attr('class', 'nvd3 background')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y axis');
      gEnter.append('g').attr('class', 'scatterWrap');
      gEnter.append('g').attr('class', 'distWrap');
      gEnter.append('g').attr('class', 'legendWrap');
      gEnter.append('g').attr('class', 'controlsWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      if (showLegend) {
        legend.width( availableWidth / 2 );

        wrap.select('.legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.legendWrap')
            .attr('transform', 'translate(' + (availableWidth / 2) + ',' + (-margin.top) +')');
      }


      if (showControls) {
        controls.width(180).color(['#444']);
        g.select('.controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }


      scatter
          .width(availableWidth)
          .height(availableHeight)
          .color(data.map(function(d,i) {
            return d.color || color[i % color.length];
          }).filter(function(d,i) { return !data[i].disabled }))


      var scatterWrap = wrap.select('.scatterWrap')
          .datum(data.filter(function(d) { return !d.disabled }));
      d3.transition(scatterWrap).call(scatter);


      xAxis
          .scale(x)
          .ticks( availableWidth / 100 )
          .tickSize( -availableHeight , 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + y.range()[0] + ')')
          .call(xAxis);


      yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

      g.select('.y.axis')
          .call(yAxis);


      distX
          .width(availableWidth)
          .color(data.map(function(d,i) {
            return d.color || color[i % color.length];
          }).filter(function(d,i) { return !data[i].disabled }));
      gEnter.select('.distWrap').append('g')
          .attr('class', 'distributionX')
          .attr('transform', 'translate(0,' + y.range()[0] + ')');
      g.select('.distributionX')
          .datum(data.filter(function(d) { return !d.disabled }))
          .call(distX);


      distY
          .width(availableHeight)
          .color(data.map(function(d,i) {
            return d.color || color[i % color.length];
          }).filter(function(d,i) { return !data[i].disabled }));
      gEnter.select('.distWrap').append('g')
          .attr('class', 'distributionY')
          .attr('transform', 'translate(-' + distY.size() + ',0)');
      g.select('.distributionY')
          .datum(data.filter(function(d) { return !d.disabled }))
          .call(distY);


      g.select('.background').on('mousemove', updateFisheye);
      g.select('.background').on('click', function() { pauseFisheye = !pauseFisheye; });
      g.select('.point-paths').on('click', function() { pauseFisheye = !pauseFisheye; });
      //g.select('.point-paths').on('mousemove', updateFisheye);


      function updateFisheye() {
        if (pauseFisheye) {
          g.select('.point-paths').style('pointer-events', 'all');
          return false;
        }

        g.select('.point-paths').style('pointer-events', 'none' );

        var mouse = d3.mouse(this);
        x.distortion(fisheye).focus(mouse[0]);
        y.distortion(fisheye).focus(mouse[1]);

        scatterWrap.call(scatter);
        g.select('.x.axis').call(xAxis);
        g.select('.y.axis').call(yAxis);
        g.select('.distributionX')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
        g.select('.distributionY')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        fisheye = d.disabled ? 0 : 2.5;
        g.select('.background') .style('pointer-events', d.disabled ? 'none' : 'all');
        g.select('.point-paths').style('pointer-events', d.disabled ? 'all' : 'none' );

        if (d.disabled) {
          x.distortion(fisheye).focus(0);
          y.distortion(fisheye).focus(0);

          scatterWrap.call(scatter);
          g.select('.x.axis').call(xAxis);
          g.select('.y.axis').call(yAxis);
        } else {
          pauseFisheye = false;
        }

        chart(selection);
      });

      legend.dispatch.on('legendClick', function(d,i, that) {
        d.disabled = !d.disabled;

        if (!data.filter(function(d) { return !d.disabled }).length) {
          data.map(function(d) {
            d.disabled = false;
            wrap.selectAll('.series').classed('disabled', false);
            return d;
          });
        }

        chart(selection);
      });

      /*
      legend.dispatch.on('legendMouseover', function(d, i) {
        d.hover = true;
        chart(selection);
      });

      legend.dispatch.on('legendMouseout', function(d, i) {
        d.hover = false;
        chart(selection);
      });
      */

      scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        d3.select('.chart-' + scatter.id() + ' .series-' + e.seriesIndex + ' .distx-' + e.pointIndex)
            .attr('y1', e.pos[1] - availableHeight);
        d3.select('.chart-' + scatter.id() + ' .series-' + e.seriesIndex + ' .disty-' + e.pointIndex)
            .attr('x2', e.pos[0] + distX.size());

        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      //store old scales for use in transitions on update, to animate from old to new positions, and sizes
      x0 = x.copy();
      y0 = y.copy();


      chart.update = function() { chart(selection) };
      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

    }