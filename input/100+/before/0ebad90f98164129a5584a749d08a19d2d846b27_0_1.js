function(new_primary) {
            if (new_primary == primary) return;

            primary = new_primary;

            stripes_miny = Math.min.apply(Math, stripesy[primary]);
            stripes_maxy = Math.max.apply(Math, stripesy[primary]);

            chart.stripes = createStripes();

            chart.markers.remove();
            chart.markers = createMarkers();
            chart.markers.toFront();

            for (var i = 0; i < chart.lines.length; i++) {
                chart.lines[i].attr({
                  opacity: (i == primary) ? 1 : inactive_opacity
                });
            }
        }