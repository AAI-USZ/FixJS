function(rows, coord, zoom, zoom_diff) {
    var row;
    var xcoords;
    var ycoords;
    var deforestation;

    if(typeof(ArrayBuffer) !== undefined) {
        xcoords = new Uint8Array(new ArrayBuffer(rows.length));
        ycoords = new Uint8Array(new ArrayBuffer(rows.length));
        deforestation = new Uint8Array(new ArrayBuffer(rows.length*MAX_MONTHS));// 256 months
    } else {
        // fallback
        xcoords = [];
        ycoords = [];
        deforestation = [];
        // array buffer set by default to 0
        // fucking javascript arrays not
        for(var i = 0; i < rows.length*MAX_MONTHS; ++i){
            deforestation[i] = 0;
        }
    }

    // base tile x, y
    var tile_base_x = coord.x*256;
    var tile_base_y = coord.y*256;
    for(var i in rows) {
      row = rows[i];
      xcoords[i] = (row.x - tile_base_x) << zoom_diff;
      ycoords[i] = (row.y - tile_base_y) << zoom_diff;
      var base_idx = i*MAX_MONTHS;
      //def[row.sd[0]] = row.se[0];
      for(var j = 0; j < row.sd.length; ++j) {
          deforestation[base_idx + row.sd[j] - BASE_MONTH] = row.se[j];
      };
      for(var j = 1; j < MAX_MONTHS; ++j) {
        deforestation[base_idx + j] += deforestation[base_idx + j - 1];
      }
    }
    return {
        length: rows.length,
        xcoords: xcoords,
        ycoords: ycoords,
        deforestation: deforestation,
        size: 1 << zoom_diff
    };
    /*var row;
    var cells = [];
    var d;
    for(var i in rows) {
      row = rows[i];
      // filter the spikes in deforestation change


      var acumm_normalized = [];
      var cumm = row.cummulative;
      var max = this.pixel_size*this.pixel_size;
      var max_p = max >>4;

      for(d = 0, l = cumm.length; d < l; ++d) {
          //acumm_normalized[d] = (4*((cumm[d] - cumm[0])/(max - cumm[0]))) >> 0;
          if((cumm[d] - cumm[0]) > max_p) {
            acumm_normalized[d] = 1 + ((3*((cumm[d] - cumm[0])/(max - cumm[0]))) >> 0);
          } else {
            acumm_normalized[d] = 0;
          }
      }

      // steps!
      var def = row.time_series;
      var steps = row.time_series;
      var last = -10;

      steps[0] = 0;
      steps[1] = 0;
      for(d = 2; d < def.length; ++d) {
        if(def[d] > 0) {
          last = d;
        }
        steps[d] = 0;
        if(acumm_normalized[d] > 0) {
            steps[d] = Math.max(0, 3 - (d - last));
        }
      }

      //var buffer = new ArrayBuffer(row.);

      cells[i] = {
        x: row.upper_left_x,
        y: row.upper_left_y,
        w: row.cell_width,
        h: row.cell_width,
        months_accum: acumm_normalized,//row.cummulative,
        months: row.time_series
      }
    }
    return cells;
    */
}