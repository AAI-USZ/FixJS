function(AThis,AEvent) {
      // mouse move on canvas
    this.updateRealXY(AThis,AEvent)
    rxy.innerHTML = 'X:'+this.real_x.toFixed(1)+', Y:'+this.real_y.toFixed(1);

    // pan
    if (this.start_button==1) {
      // redraw bg on new position
      kiji.context.clearRect(0,0,kiji.canvas.width,kiji.canvas.height);
      kiji.context.fillRect();
      kiji.context.drawImage(kiji.bg, kiji.dx+this.real_x-this.start_x, kiji.dy+this.real_y-this.start_y);
    }

    // draw items being moved
    if (kiji.tool == 'Move') {
      if ((this.start_button==0) && (this.sel_count>=0)) {
        // background
        kiji.context.clearRect(0,0,kiji.canvas.width,kiji.canvas.height);
        kiji.context.fillRect();
        kiji.context.drawImage(kiji.bg, kiji.dx, kiji.dy);
        // single line is moved differently
        if ( (kiji.current_item)&&(kiji.current_item.Type == 'Line') && (this.sel_count==1) && (this.start_handle > 0) ) {
          // move begin/all/end of single line
          // move begin if line
          if (this.start_handle==1) {
            lineDrawPrimitive(kiji.dx,kiji.dy,
              this.real_x,
              this.real_y,
              kiji.current_item.EndX,
              kiji.current_item.EndY,
              kiji.current_item.Selected,
              kiji.current_item.Color,
              kiji.current_item.Thickness);
          }
          // move end of line
          if (this.start_handle==2) {
            lineDrawPrimitive(kiji.dx,kiji.dy,
              kiji.current_item.X,
              kiji.current_item.Y,
              this.real_x,
              this.real_y,
              kiji.current_item.Selected,
              kiji.current_item.Color,
              kiji.current_item.Thickness);
          }
        } else {
          // move other items (Text)
          var dx2 = kiji.dx + this.real_x - this.start_x;
          var dy2 = kiji.dy + this.real_y - this.start_y;
          for (var i=0; i<kiji.report.length; i++)
            if (kiji.report[i].Selected)
              kiji.report[i].draw(dx2,dy2);
        }
      }
    }

    // redraw line while it is being added
    if ( (kiji.tool == 'Line')&&(this.start_button==0) ) {
      // background
      kiji.context.clearRect(0,0,kiji.canvas.width,kiji.canvas.height);
      kiji.context.fillRect();
      kiji.context.drawImage(kiji.bg, kiji.dx, kiji.dy);
      // cline
      lineDrawPrimitive(kiji.dx,kiji.dy,
        this.start_x,
        this.start_y,
        this.real_x,
        this.real_y,
        false,'black',1);
    }

    return true;
  }