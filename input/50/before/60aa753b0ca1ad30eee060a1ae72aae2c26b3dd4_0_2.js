function stop_drag(){
    $(document).unbind("mouseup",stop_drag);
    $(document).unbind("mousemove",drag);
    drag_callbacks[1](current_color);
  }