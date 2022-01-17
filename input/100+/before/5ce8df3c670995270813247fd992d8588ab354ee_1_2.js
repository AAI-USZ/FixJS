function (e, target) {
      var s = this.upperCanvasEl.style;
      if (!target) {
        s.cursor = this.defaultCursor;
        return false;
      }
      else {
        var activeGroup = this.getActiveGroup();
        // only show proper corner when group selection is not active
        var corner = !!target._findTargetCorner
                      && (!activeGroup || !activeGroup.contains(target))
                      && target._findTargetCorner(e, this._offset);

        if (!corner) {
          s.cursor = this.hoverCursor;
        }
        else {
          if (corner in cursorMap) {
            s.cursor = cursorMap[corner];
          } else if (corner === 'mtr' || corner === 'mbr') {
            s.cursor = this.rotationCursor;
          } else {
            s.cursor = this.defaulCursor;
            return false;
          }
        }
      }
      return true;
    }