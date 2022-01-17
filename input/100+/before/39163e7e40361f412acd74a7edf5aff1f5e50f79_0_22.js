function(pos, pointer) {
    var options = this.options,
        offset = D.position(this.overlay),
        s = this.selection.selection;

    if(options.selection.mode.indexOf('x') == -1){
      pos.x = (pos == s.first) ? 0 : this.plotWidth;         
    }else{
      pos.x = boundX(pointer.pageX - offset.left - this.plotOffset.left, this);
    }

    if (options.selection.mode.indexOf('y') == -1){
      pos.y = (pos == s.first) ? 0 : this.plotHeight - 1;
    }else{
      pos.y = boundY(pointer.pageY - offset.top - this.plotOffset.top, this);
    }
  }