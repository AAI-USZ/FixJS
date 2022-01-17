function() {
      var x = status.cCoords.x;
      this.isDropDisabled = false;

      if (x > limits.right) {
        this.isDropDisabled = true;
        var curPageObj = pageHelper.getCurrent();
        if (pages.current < pages.total - 1 && !this.isTranslatingPages) {
          curPageObj.remove(draggableIcon);
          pageHelper.getNext().prependIcon(draggableIcon);
          goNext();
          this.setTranslatingPages(true);
        } else if (curPageObj.getNumApps() > 1 && !this.isTranslatingPages) {
          // New page if there are two or more icons
          curPageObj.remove(draggableIcon);
          pageHelper.push([draggableIcon]);
          goNext();
          this.setTranslatingPages(true);
        }
      } else if (x < limits.left) {
        this.isDropDisabled = true;
        if (pages.current > 0 && !this.isTranslatingPages) {
          pageHelper.getCurrent().remove(draggableIcon);
          pageHelper.getPrevious().append(draggableIcon);
          goPrev();
          this.setTranslatingPages(true);
        }
      }
    }