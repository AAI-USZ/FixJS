function updateFlightsFromJSON() {
  for (fid in flights) {
    var url = "/tracking/" + flights[fid].sfid + "/json";

    $.ajax(url, {
      data: { last_update: flights[fid].last_update || null },
      success: function(data) {
        updateFlight(data.sfid, data.encoded.points, data.encoded.levels,
                     data.num_levels, data.barogram_t, data.barogram_h);

        map.events.triggerEvent("move");
        $.proxy(updateBarogram, { reset_y_axis: true })();
      }
    });
  }
}