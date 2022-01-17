function(AThis,AEvent) {
    // release mouse button
    //console.log('MouseHandler.canvasOnMouseUp(...)');
    this.updateRealXY(AThis,AEvent)

    // finish pan
    if (this.start_button==1) {
      kiji.dx = kiji.dx + this.real_x - this.start_x;
      kiji.dy = kiji.dy + this.real_y - this.start_y;
      redraw('mh.canvasOnMouseUp');
    }

    // finish move
    if (kiji.tool == 'Move') {
      if ((this.start_button==0) && (this.sel_count>=0)) {
        undoPush(kiji.report);
        // finished moving line begin
        if (this.start_handle == 1) {
          //console.log('finished moving line begin');
          kiji.current_item.X = this.real_x;
          kiji.current_item.Y = this.real_y;
        }
        // finished moving line end
        if (this.start_handle == 2) {
          //console.log('finished moving line end');
          kiji.current_item.EndX = this.real_x;
          kiji.current_item.EndY = this.real_y;
        }
        // ortogonalize line after editing
        if (this.start_handle > 0)
          lineOrtogonalize(kiji.current_item,this.start_handle);
        // finish moving normal objects or middle of line
        if (this.start_handle <= 0)
          itemMoveSelected(kiji.report, this.real_x-this.start_x, this.real_y-this.start_y);
        // redraw
        redraw('mh.canvasOnMouseUp 2');
      }
    }

    // text: click where new text is supposed to be added
    if ( (kiji.tool == 'Text') && (this.start_button == 0) ) {
      var s = 'Caption';
      var fs = itemFirstSelected(kiji.report);
      attributesShow(fs);
      var s = prompt('Add new text',s);
      if (s) {
        undoPush(kiji.report);
        // add new text
        var t = textCreate(kiji.canvas,kiji.context,s,this.real_x,this.real_y);
        kiji.current_item = t;
        kiji.report.push(t);
      }
      redraw('mh.canvasOnMouseUp 3');
    }

    // line: end of line
    if ( (kiji.tool == 'Line') && (this.start_button == 0) ) {
      // add new line
      undoPush(kiji.report);
      var l = lineCreate(kiji.canvas, kiji.context, this.start_x, this.start_y, this.real_x, this.real_y);
      lineOrtogonalize(l);
      kiji.current_item = l;
      kiji.report.push(l)
      redraw('mh.canvasOnMouseUp 4');
    }

    // button is no longer down
    this.start_button = -1;

    return false;
  }