function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //add series index to each data point for reference
      data = data.map(function(series, i) {
        series.values = series.values.map(function(point) {
          point.series = i;
          return point;
        });
        return series;
      });



      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain && sizeDomain) ? [] : // if we know xDomain and yDomain and sizeDomain, no need to calculate.... if Size is constant remember to set sizeDomain to speed up performance
            d3.merge(
              data.map(function(d) {
                return d.values.map(function(d,i) {
                  return { x: getX(d,i), y: getY(d,i), size: getSize(d,i) }
                })
              })
            );

      x   .domain(xDomain || d3.extent(seriesData.map(function(d) { return d.x }).concat(forceX)))
          .range([0, availableWidth]);

      y   .domain(yDomain || d3.extent(seriesData.map(function(d) { return d.y }).concat(forceY)))
          .range([availableHeight, 0]);

      z   .domain(sizeDomain || d3.extent(seriesData.map(function(d) { return d.size }).concat(forceSize)))
          .range([16, 256]);

      x0 = x0 || x;
      y0 = y0 || y;
      z0 = z0 || z;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.wrap.scatter').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 scatter chart-' +id);
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'groups');
      gEnter.append('g').attr('class', 'point-paths');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      defsEnter.append('clipPath')
          .attr('id', 'edge-clip-' + id)
        .append('rect');

      wrap.select('#edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#edge-clip-' + id + ')' : '');



      function updateInteractiveLayer() {

        if (!interactive) return false;


        var vertices = d3.merge(data.map(function(group, groupIndex) {
            return group.values
              .filter(pointActive) // remove non-interactive points
              .map(function(point, pointIndex) {
                // *Adding noise to make duplicates very unlikely
                // **Injecting series and point index for reference
                return [x(getX(point,pointIndex)) * (Math.random() / 1e12 + 1)  , y(getY(point,pointIndex)) * (Math.random() / 1e12 + 1), groupIndex, pointIndex]; //temp hack to add noise untill I think of a better way so there are no duplicates
              })
          })
        );


        if (clipVoronoi) {
          defsEnter.append('clipPath').attr('id', 'points-clip-' + id);

          var pointClips = wrap.select('#points-clip-' + id).selectAll('circle')
              .data(vertices);
          pointClips.enter().append('circle')
              .attr('r', clipRadius);
          pointClips.exit().remove();
          pointClips
              .attr('cx', function(d) { return d[0] })
              .attr('cy', function(d) { return d[1] });

          wrap.select('.point-paths')
              .attr('clip-path', 'url(#points-clip-' + id + ')');
        }


        //inject series and point index for reference into voronoi
        var voronoi = d3.geom.voronoi(vertices).map(function(d, i) {
            return {
              'data': d,
              'series': vertices[i][2],
              'point': vertices[i][3]
            }
          });


        var pointPaths = wrap.select('.point-paths').selectAll('path')
            .data(voronoi);
        pointPaths.enter().append('path')
            .attr('class', function(d,i) { return 'path-'+i; });
        pointPaths.exit().remove();
        pointPaths
            .attr('d', function(d) { return 'M' + d.data.join(',') + 'Z'; })
            .on('click', function(d) {
              var series = data[d.series],
                  point  = series.values[d.point];

              dispatch.elementClick({
                point: point,
                series: series,
                pos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
                seriesIndex: d.series,
                pointIndex: d.point
              });
            })
            .on('mouseover', function(d) {
              var series = data[d.series],
                  point  = series.values[d.point];

              dispatch.elementMouseover({
                point: point,
                series: series,
                pos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
                seriesIndex: d.series,
                pointIndex: d.point
              });
            })
            .on('mouseout', function(d, i) {
              var series = data[d.series],
                  point  = series.values[d.point];

              dispatch.elementMouseout({
                point: point,
                series: series,
                seriesIndex: d.series,
                pointIndex: d.point
              });
            });

      }



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
          .classed('hover', function(d) { return d.hover });
      d3.transition(groups)
          .style('fill', function(d,i) { return color[i % color.length] })
          .style('stroke', function(d,i) { return color[i % color.length] })
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);


      var points = groups.selectAll('path.point')
          .data(function(d) { return d.values });
      points.enter().append('path')
          .attr('transform', function(d,i) {
            return 'translate(' + x0(getX(d,i)) + ',' + y0(getY(d,i)) + ')'
          })
          .attr('d',
            d3.svg.symbol()
              .type(getShape)
              .size(function(d,i) { return z(getSize(d,i)) })
          );
      d3.transition(groups.exit().selectAll('path.point'))
          .attr('transform', function(d,i) {
            return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
          })
          .remove();
      points.attr('class', function(d,i) { return 'point point-' + i });
      d3.transition(points)
          .attr('transform', function(d,i) {
            return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
          })
          .attr('d',
            d3.svg.symbol()
              .type(getShape)
              .size(function(d,i) { return z(getSize(d,i)) })
          );


      // Delay updating the invisible interactive layer for smoother animation
      clearTimeout(timeoutID); // stop repeat calls to updateInteractiveLayer
      timeoutID = setTimeout(updateInteractiveLayer, 1000);

      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();
      z0 = z.copy();

    }