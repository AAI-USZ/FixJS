function generatePreview() {
    if (raw_gcode_by_color) {        
      var exclude_colors =  {};
      $('#canvas_properties div.colorbtns button').each(function(index) {
        if (!($(this).hasClass('active'))) {
          // alert(JSON.stringify($(this).find('div i').text()));
          exclude_colors[$(this).find('div span').text()] = 1;
        }
      });
      
      icanvas.background('#ffffff');
      for (var color in raw_gcode_by_color) {
        if (!(color in exclude_colors)) {
          var scale = 0.5;
          GcodeReader.parse(raw_gcode_by_color[color], scale);
          GcodeReader.draw(icanvas, color);
          var bbox_width = (GcodeReader.bbox[2] - GcodeReader.bbox[0]) / scale;
          var bbox_height = (GcodeReader.bbox[3] - GcodeReader.bbox[1]) / scale;
          $().uxmessage('notice', "The calculated bounding box is " 
            + bbox_width.toFixed(1) + 'x' + bbox_height.toFixed(1) + 'mm'
            + ' (' + (bbox_width/25.4).toFixed(1) + 'x' + (bbox_height/25.4).toFixed(1) + 'in).');
        }
      }
    } else {
      $().uxmessage('notice', "No data loaded to generate preview.");
    }       
  }