function bodyOnKeyDown(AThis,AEvent) {
  // special keys (like del)
  //console.log(AEvent);

  // if any input element is focused, disable items shortcuts because they would interfere with text input key bindings (arrows, ctrl+arrows, ctrl+shift+arrows, ctrl+a, del, ...)
  if (attributes_focused)
    return true;

  // ctrl+z = undo
  if ( AEvent.ctrlKey && (AEvent.keyCode==90) )
    toolUndo();

  // delete = delete selected items
  console.log('bodyOnKeyDown(keyCode='+AEvent.keyCode+', shiftKey='+AEvent.shiftKey+', ctrlKey='+AEvent.ctrlKey+')');
  // ', focus='+(focused_input?focused_input.id:null)+
  if (/*(!focused_input)&&*/(AEvent.keyCode == 46)&&(itemSelectedCount(report)>0)) {
    console.log('DEL');
    document.activeElement = canvas;
    undoPush(report);
    itemDeleteSelected(report);
    current_item = null;
    mouse_handler.current = null;
    redraw('bodyOnKeyDown 1');
    attributesShow(null);
    return true;
  }

  // was arrows used
  var left  = (AEvent.keyCode == 37);
  var right = (AEvent.keyCode == 39);
  var up    = (AEvent.keyCode == 38);
  var down  = (AEvent.keyCode == 40);
  var arrows = (left||right||up||down);

  // shift+arrows changes item size
  if (AEvent.shiftKey && arrows) {
    // text: up/down changes Height
    for (i=0; i<report.length; i++) {
      if (report[i].Selected) {
        switch (report[i].Type) {
          case "Line": lineResize(report[i],left,right,up,down,mouse_handler.start_handle); break;
          case "Text": textResize(canvas,context,report[i],left,right,up,down); break;
        }
      }
    }
    // done
    redraw('bodyOnKeyDown 2');
    attributesShow(current_item);
    return true;
  } else {
    // arrow movements (1px normal, 8px when ctrl is pressed)
    if (AEvent.ctrlKey) {   // temporal workaround - to prevent movement of item when cursor moves in input
      var delta = AEvent.ctrlKey ? 1 : 8;
      // up
      if (AEvent.keyCode==38) {
        itemMoveSelected(report,0,-delta);
        redraw('bodyOnKeyDown 3');
        return true;
      }
      // down
      if (AEvent.keyCode==40) {
        itemMoveSelected(report,0,delta);
        redraw('bodyOnKeyDown 4');
        return true;
      }
      // left
      if (AEvent.keyCode==37) {
        itemMoveSelected(report,-delta,0);
        redraw('bodyOnKeyDown 5');
        return true;
      }
      // right
      if (AEvent.keyCode==39) {
        itemMoveSelected(report,delta,0);
        redraw('bodyOnKeyDown 6');
        return true;
      }
    } else {
      //
      return true;
    }
  }

  return true;
}