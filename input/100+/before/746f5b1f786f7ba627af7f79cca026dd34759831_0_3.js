function(e) {
    this.dragging = false;
    if (!this.dragged) {
      if (e.target.tagName == "CANVAS") {
        var c = this.coords(e);
        this.togglePolling(c);
        c.x -= this.o_x;

        // Perform a navigation
        var cell = this.coordsToCell(c);
        var selectedPair = this.model.get('swimlaneLabels')[cell.row];
        var gridStartTime = this.model.get('startTime');
        var selectedIdx = cell.column;
        var bucketSize = this.model.get('bucketSize');

        // Workaround for daily granularity
        if (bucketSize == 86400) {
          selectedIdx--;
        }

        var selectionStartTime = new Date(gridStartTime.getTime() + (selectedIdx * bucketSize * 1000));
        var selectionEndTime = new Date(selectionStartTime.getTime() + (bucketSize * 1000));
        $(this.el).trigger('blob:selected', [selectedPair, selectionStartTime.toString(TIME_FORMAT), selectionEndTime.toString(TIME_FORMAT)]);
      }
    } else {
      if (Math.abs(this.o_x) >= this.rightLimit) {
        this.model.startPolling();
      }
    }
    this.dragged = false;
    e.target.style.cursor = "default";
  }