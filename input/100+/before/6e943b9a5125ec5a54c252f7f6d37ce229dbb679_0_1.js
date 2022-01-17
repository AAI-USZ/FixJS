function graph(selection) {
    if (!selection) { selection = elem; }
    selection.each(function() {

      elem = d3.select(this);

      if (this.clientWidth && this.clientHeight) {
        cx = this.clientWidth;
        cy = this.clientHeight;
        size.width  = cx - padding.left - padding.right;
        size.height = cy - padding.top  - padding.bottom;
      }

      points = options.points || fakeDataPoints();
      updateXScale();
      updateYScale();

      if (svg === undefined) {

        svg = elem.append("svg")
            .attr("width",  cx)
            .attr("height", cy);

        vis = svg.append("g")
              .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

        plot = vis.append("rect")
            .attr("class", "plot")
            .attr("width", size.width)
            .attr("height", size.height)
            .style("fill", "#EEEEEE")
            .attr("pointer-events", "all")
            .on("mousedown.drag", plot_drag)
            .on("touchstart.drag", plot_drag)
            .call(d3.behavior.zoom().x(xScale).y(yScale).on("zoom", redraw));

        viewbox = vis.append("svg")
            .attr("class", "viewbox")
            .attr("top", 0)
            .attr("left", 0)
            .attr("width", size.width)
            .attr("height", size.height)
            .attr("viewBox", "0 0 "+size.width+" "+size.height)
            .attr("class", "line");

        viewbox.append("path")
            .attr("class", "line")
            .style("stroke-width", strokeWidth)
            .attr("d", line(points));

        // add Chart Title
        if (options.title && sizeType.value > 1) {
          title = vis.selectAll("text")
            .data(titles, function(d) { return d; });
          title.enter().append("text")
              .attr("class", "title")
              .style("font-size", sizeType.value/2.4 * 100 + "%")
              .text(function(d) { return d; })
              .attr("x", size.width/2)
              .attr("dy", function(d, i) { return -0.5 + -1 * sizeType.value/2.8 * i * emsize + "em"; })
              .style("text-anchor","middle");
        }

        // Add the x-axis label
        if (options.xlabel && sizeType.value > 2) {
          xlabel = vis.append("text")
              .attr("class", "axis")
              .style("font-size", sizeType.value/2.6 * 100 + "%")
              .text(options.xlabel)
              .attr("x", size.width/2)
              .attr("y", size.height)
              .attr("dy","2.4em")
              .style("text-anchor","middle");
        }

        // add y-axis label
        if (options.ylabel && sizeType.value > 2) {
          ylabel = vis.append("g").append("text")
              .attr("class", "axis")
              .style("font-size", sizeType.value/2.6 * 100 + "%")
              .text(options.ylabel)
              .style("text-anchor","middle")
              .attr("transform","translate(" + -50 + " " + size.height/2+") rotate(-90)");
        }

        d3.select(node)
            .on("mousemove.drag", mousemove)
            .on("touchmove.drag", mousemove)
            .on("mouseup.drag",   mouseup)
            .on("touchend.drag",  mouseup);

        notification = vis.append("text")
            .attr("class", "graph-notification")
            .text(message)
            .attr("x", size.width/2)
            .attr("y", size.height/2)
            .style("text-anchor","middle");

      } else {

        vis
          .attr("width",  cx)
          .attr("height", cy);

        plot
          .attr("width", size.width)
          .attr("height", size.height);

        viewbox
            .attr("top", 0)
            .attr("left", 0)
            .attr("width", size.width)
            .attr("height", size.height)
            .attr("viewBox", "0 0 "+size.width+" "+size.height);

        if (options.title && sizeType.value > 1) {
            title.each(function(d, i) {
              d3.select(this).attr("x", size.width/2);
              d3.select(this).attr("dy", function(d, i) { return 1.4 * i - titles.length + "em"; });
            });
        }

        if (options.xlabel && sizeType.value > 1) {
          xlabel
              .attr("x", size.width/2)
              .attr("y", size.height);
        }

        if (options.ylabel && sizeType.value > 1) {
          ylabel
              .attr("transform","translate(" + -40 + " " + size.height/2+") rotate(-90)");
        }

        notification
          .attr("x", size.width/2)
          .attr("y", size.height/2);
      }
      redraw();
    });

    function notify(mesg) {
      // add Chart Notification
      message = mesg;
      if (mesg) {
        notification.text(mesg);
      } else {
        notification.text('');
      }
    }

    function fakeDataPoints() {
      var yrange2 = options.yrange / 2,
          yrange4 = yrange2 / 2,
          pnts;

      options.datacount = size.width/30;
      options.xtic = options.xrange / options.datacount;
      options.ytic = options.yrange / options.datacount;

      pnts = d3.range(options.datacount).map(function(i) {
        return [i * options.xtic + options.xmin, options.ymin + yrange4 + Math.random() * yrange2 ];
      });
      return pnts;
    }

    function keydown() {
      if (!selected) return;
      switch (d3.event.keyCode) {
        case 8:   // backspace
        case 46:  // delete
        if (options.dataChange) {
          var i = points.indexOf(selected);
          points.splice(i, 1);
          selected = points.length ? points[i > 0 ? i - 1 : 0] : null;
          update();
        }
        if (d3.event && d3.event.keyCode) {
          d3.event.preventDefault();
          d3.event.stopPropagation();
        }
        break;
      }
    }

    // update the layout
    function updateLayout() {
      padding = {
       "top":    options.title  ? 40 : 20,
       "right":                 30,
       "bottom": options.xlabel ? 60 : 10,
       "left":   options.ylabel ? 70 : 45
      };

      size.width  = cx - padding.left - padding.right;
      size.height = cy - padding.top  - padding.bottom;

      plot.attr("width", size.width)
          .attr("height", size.height);
    }

    // Update the x-scale.
    function updateXScale() {
      xScale.domain([options.xmin, options.xmax])
            .range([0, size.width]);
    }

    // Update the y-scale.
    function updateYScale() {
      yScale.domain([options.ymin, options.ymax])
            .range([size.height, 0]);
    }

    function redraw() {

      // Regenerate x-ticks…
      var gx = vis.selectAll("g.x")
          .data(xScale.ticks(options.xTicCount), String)
          .attr("transform", tx);

      var gxe = gx.enter().insert("g", "a")
          .attr("class", "x")
          .attr("transform", tx);

      gxe.append("line")
          .attr("stroke", stroke)
          .attr("y1", 0)
          .attr("y2", size.height);

      if (sizeType.value > 1) {
        gxe.append("text")
            .attr("class", "axis")
            .style("font-size", sizeType.value/2.7 * 100 + "%")
            .attr("y", size.height)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text(fx)
            .style("cursor", "ew-resize")
            .on("mouseover", function(d) { d3.select(this).style("font-weight", "bold");})
            .on("mouseout",  function(d) { d3.select(this).style("font-weight", "normal");})
            .on("mousedown.drag",  xaxis_drag)
            .on("touchstart.drag", xaxis_drag);
      }

      gx.exit().remove();

      // Regenerate y-ticks…
      var gy = vis.selectAll("g.y")
          .data(yScale.ticks(options.yTicCount), String)
          .attr("transform", ty);

      var gye = gy.enter().insert("g", "a")
          .attr("class", "y")
          .attr("transform", ty)
          .attr("background-fill", "#FFEEB6");

      gye.append("line")
          .attr("stroke", stroke)
          .attr("x1", 0)
          .attr("x2", size.width);

      if (sizeType.value > 1) {
        gye.append("text")
            .attr("class", "axis")
            .style("font-size", sizeType.value/2.7 * 100 + "%")
            .attr("x", -3)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(fy)
            .style("cursor", "ns-resize")
            .on("mouseover", function(d) { d3.select(this).style("font-weight", "bold");})
            .on("mouseout",  function(d) { d3.select(this).style("font-weight", "normal");})
            .on("mousedown.drag",  yaxis_drag)
            .on("touchstart.drag", yaxis_drag);
      }

      gy.exit().remove();
      plot.call(d3.behavior.zoom().x(xScale).y(yScale).on("zoom", redraw));
      update();
    }

    function update() {
      var lines = vis.select("path").attr("d", line(points));

      var circle = vis.select("svg").selectAll("circle")
          .data(points, function(d) { return d; });

      if (options.circleRadius && sizeType.value > 1) {
        if (!(options.circleRadius <= 4 && sizeType.value < 3)) {
          circle.enter().append("circle")
              .attr("class", function(d) { return d === selected ? "selected" : null; })
              .attr("cx",    function(d) { return xScale(d[0]); })
              .attr("cy",    function(d) { return yScale(d[1]); })
              .attr("r", options.circleRadius * (1 + sizeType.value) / 4)
              .style("stroke-width", options.circleRadius/6 * (sizeType.value - 1.5))
              .style("cursor", circleCursorStyle)
              .on("mousedown.drag",  datapoint_drag)
              .on("touchstart.drag", datapoint_drag);

          circle
              .attr("class", function(d) { return d === selected ? "selected" : null; })
              .attr("cx",    function(d) { return xScale(d[0]); })
              .attr("cy",    function(d) { return yScale(d[1]); })
              .attr("r", options.circleRadius * (1 + sizeType.value) / 4)
              .style("stroke-width", options.circleRadius/6 * (sizeType.value - 1.5));
        }
      }

      circle.exit().remove();

      if (d3.event && d3.event.keyCode) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
      }
    }

    function plot_drag() {
      d3.event.preventDefault();
      grapher.registerKeyboardHandler(keydown);
      d3.select('body').style("cursor", "move");
      if (d3.event.altKey) {
        if (d3.event.shiftKey && options.addData) {
          var p = d3.svg.mouse(vis.node());
          var newpoint = [];
          newpoint[0] = xScale.invert(Math.max(0, Math.min(size.width,  p[0])));
          newpoint[1] = yScale.invert(Math.max(0, Math.min(size.height, p[1])));
          points.push(newpoint);
          points.sort(function(a, b) {
            if (a[0] < b[0]) { return -1; }
            if (a[0] > b[0]) { return  1; }
            return 0;
          });
          selected = newpoint;
          update();
        } else {
          var p = d3.svg.mouse(vis[0][0]);
          downx = xScale.invert(p[0]);
          downy = yScale.invert(p[1]);
          dragged = false;
          d3.event.stopPropagation();
        }
        // d3.event.stopPropagation();
      }
    }

    function xaxis_drag(d) {
      document.onselectstart = function() { return false; };
      d3.event.preventDefault();
      var p = d3.svg.mouse(vis[0][0]);
      downx = xScale.invert(p[0]);
    }

    function yaxis_drag(d) {
      document.onselectstart = function() { return false; };
      d3.event.preventDefault();
      var p = d3.svg.mouse(vis[0][0]);
      downy = yScale.invert(p[1]);
    }

    function datapoint_drag(d) {
      grapher.registerKeyboardHandler(keydown);
      document.onselectstart = function() { return false; };
      selected = dragged = d;
      update();
    }

    function mousemove() {
      var p = d3.svg.mouse(vis[0][0]),
          changex, changey, new_domain,
          t = d3.event.changedTouches;

      d3.event.preventDefault();
      if (dragged && options.dataChange) {
        dragged[1] = yScale.invert(Math.max(0, Math.min(size.height, p[1])));
        update();
      }

      if (!isNaN(downx)) {
        d3.select('body').style("cursor", "ew-resize");
        xScale.domain(grapher.axis.axisProcessDrag(downx, xScale.invert(p[0]), xScale.domain()));
        redraw();
        d3.event.stopPropagation();
      }

      if (!isNaN(downy)) {
        d3.select('body').style("cursor", "ns-resize");
        yScale.domain(grapher.axis.axisProcessDrag(downy, yScale.invert(p[1]), yScale.domain()));
        redraw();
        d3.event.stopPropagation();
      }
    }

    function mouseup() {
      document.onselectstart = function() { return true; };
      d3.select('body').style("cursor", "auto");
      if (!isNaN(downx)) {
        downx = Math.NaN;
        redraw();
      }
      if (!isNaN(downy)) {
        downy = Math.NaN;
        redraw();
      }
      dragged = null;
    }

    // make these private variables and functions available
    graph.elem = elem;
    graph.redraw = redraw;
    graph.update = update;
    graph.notify = notify;
    graph.initialize = initialize;
    graph.updateXScale = updateXScale;
    graph.updateYScale = updateYScale;
    graph.scale = scale;

  }