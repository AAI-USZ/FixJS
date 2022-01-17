function (event) {
      if (!this.options.selection || !this.options.selection.mode) return;
      if (!this.options.selection.mode || (!isLeftClick(event) && _.isUndefined(event.touches))) return;

      var pointer = this.getEventPosition(event);
      this.selection.setSelectionPos(this.selection.selection.first, pointer);

      if (this.selection.interval) clearInterval(this.selection.interval);

      this.lastMousePos.pageX = null;
      this.selection.selecting = false;
      this.selection.interval = setInterval(
        _.bind(this.selection.updateSelection, this),
        1000/this.options.selection.fps
      );
    }