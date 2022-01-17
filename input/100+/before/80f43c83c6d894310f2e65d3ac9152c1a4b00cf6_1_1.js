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
          GcodeReader.parse(raw_gcode_by_color[color], 0.5);
          GcodeReader.draw(icanvas, color);
        }
      }
    } else {
      $().uxmessage('notice', "No data loaded to generate preview.");
    }       
  }