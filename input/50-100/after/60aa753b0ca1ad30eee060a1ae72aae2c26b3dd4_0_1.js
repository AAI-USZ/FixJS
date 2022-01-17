function drag(e){
    var x = e.pageX - (parent.offset().left + center),
        y = e.pageY - (parent.offset().top + center);

    if(drag_target == hue_ring){
      set_hue_cursor(x,y);
      update_color();
	  run_onchange_event();
      return true;
    }
    if(drag_target == bs_square){
      set_bs_cursor(x,y);
      update_color();
	  run_onchange_event();
      return true;
    }
  }