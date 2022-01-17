function onDrag(d,i) {
        //nv.log(this, d3.event, d, i);
        //nv.log('dx', d3.event.dx);
        //nv.log('x', d.x);

        var extent = brush.extent();

        if (d3.event.dx < 0 && extent[1] >= dx.domain()[1]
         || d3.event.dx > 0 && extent[0] <= dx.domain()[0])
          return false;

        if (d3.event.dx < 0 && dx(extent[1]) - d3.event.dx > dx.range()[1])
          d3.event.dx = dx.range()[1] - dx(extent[1]);

        var ratio = (extent[1] - extent[0]) / (dx.domain()[1] - dx.domain()[0]);
        ///TODO: Drag distance should be based on the main data's resolution, not the brush window
        //       need to calculate dx correctly
        var newExtent = [
          dx.invert(dx(extent[0]) - d3.event.dx * ratio),
          dx.invert(dx(extent[1]) - d3.event.dx * ratio)
        ];

        //nv.log(dx.domain(), extent[0], dx(extent[0]), dx.invert(dx(extent[0])));

        brush.extent(newExtent);
        g.select('.x.brush').call(brush);
        onBrush();

      }