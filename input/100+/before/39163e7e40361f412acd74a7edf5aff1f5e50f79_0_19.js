function (event) {
      if (!this.options.selection || !this.options.selection.mode) return;
      if (this.selection.interval) clearInterval(this.selection.interval);

      var pointer = E.eventPointer(event);
      this.selection.setSelectionPos(this.selection.selection.second, {pageX:pointer.x, pageY:pointer.y});
      this.selection.clearSelection();

      if(this.selection.selecting && this.selection.selectionIsSane()){
        this.selection.drawSelection();
        this.selection.fireSelectEvent();
        this.ignoreClick = true;
      }
    }