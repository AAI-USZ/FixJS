function onDrag(d,i) {
        //nv.log(this, d3.event, d, i);
        //nv.log('xi', d3.event.dx);
        //nv.log('x', d.x);

        var extent = brush.extent();

        if (d3.event.dx < 0 && extent[1] >= xi.domain()[1]
         || d3.event.dx > 0 && extent[0] <= xi.domain()[0])
          return false;


        var ratio = (extent[1] - extent[0]) / (xi.domain()[1] - xi.domain()[0]);
        ///TODO: Drag distance should be based on the main data's resolution, not the brush window
        //       need to calculate xi correctly
        var newExtent = [
          xi.invert(xi(extent[0]) - d3.event.dx * ratio),
          xi.invert(xi(extent[1]) - d3.event.dx * ratio)
        ];

        //nv.log(xi.domain(), extent[0], xi(extent[0]), xi.invert(xi(extent[0])));

        brush.extent(newExtent);
        g.select('.x.brush').call(brush);
        onBrush();

      }