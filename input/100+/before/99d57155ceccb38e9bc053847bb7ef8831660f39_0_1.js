function(data) {
        updateFlight(data.sfid, data.encoded.points, data.encoded.levels,
                     data.num_levels, data.barogram_t, data.barogram_h);

        map.events.triggerEvent("move");
        $.proxy(updateBarogram, { reset_y_axis: true })();
      }