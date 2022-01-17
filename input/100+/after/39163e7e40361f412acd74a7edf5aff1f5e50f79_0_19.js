function (event) {
      if (!this.options.selection || !this.options.selection.mode) return;
      if (this.selection.interval) clearInterval(this.selection.interval);

      var pointer = this.getEventPosition(event);
      this.selection.setSelectionPos(this.selection.selection.second, pointer);
      this.selection.clearSelection();

      if(this.selection.selecting && this.selection.selectionIsSane()){
        this.selection.drawSelection();
        this.selection.fireSelectEvent();
        this.ignoreClick = true;
      }
    }