function(data) {
      for (flight_id in flights) {
        if (flights[flight_id].sfid == data.sfid) return;
      }

      var flight_id = addFlight(data.sfid, data.encoded.points, data.encoded.levels,
                                data.num_levels, data.barogram_t, data.barogram_h,
                                data.enl, data.zoom_levels, data.contests);

      initRedrawLayer(map.getLayersByName("Flight")[0]);
      $.proxy(updateBarogram, { reset_y_axis: true })();
      setPrimaryFlight(flight_id);
    }