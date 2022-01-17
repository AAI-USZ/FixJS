function update_color(dont_replace_input_value){
    var x = bs_square.cursor.items[0].attr("cx"),
        y = bs_square.cursor.items[0].attr("cy"),
        hsb = {
          b: 1-(y-sdim.y)/sdim.l,
          s: (x-sdim.x)/sdim.l,
          h: hue()
        };

    current_color = Raphael.hsb2rgb(hsb.h, hsb.s,hsb.b);

    if(input_target){
      var c = current_color.hex;
      if(dont_replace_input_value != true) { input_target.value = c;}
       if(hsb.b < 0.5){
        $(input_target).css("color", "#FFF");
      } else {
        $(input_target).css("color", "#000");
      }
      input_target.style.background = c;
    }

  }