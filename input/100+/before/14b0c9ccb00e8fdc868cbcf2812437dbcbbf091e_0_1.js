function dg_checkLimits() {
      var x = status.cCoords.x;
      if (dirCtrl.limitNext(x)) {
        this.isDisabledDrop = true;
        if (this.isDisabledCheckingLimits) {
          return;
        }

        var curPageObj = pageHelper.getCurrent();
        if (pages.current < pages.total - 1) {
          curPageObj.remove(draggableIcon);
          pageHelper.getNext().prependIcon(draggableIcon);
          this.setDisabledCheckingLimits(true);
          this.transitioning = true;
          goNext(this.onNavigationEnd);
        } else if (curPageObj.getNumApps() > 1) {
          // New page if there are two or more icons
          curPageObj.remove(draggableIcon);
          pageHelper.push([draggableIcon]);
          this.setDisabledCheckingLimits(true);
          this.transitioning = true;
          goNext(this.onNavigationEnd);
        }
      } else if (dirCtrl.limitPrev(x)) {
        this.isDisabledDrop = true;
        if (pages.current === 0 || this.isDisabledCheckingLimits) {
          return;
        }

        var curPageObj = pageHelper.getCurrent();
        curPageObj.remove(draggableIcon);
        var prevPageObj = pageHelper.getPrevious();
        if (prevPageObj.getNumApps() === pageHelper.getMaxPerPage()) {
          var propagateIco = prevPageObj.popIcon();
          curPageObj.prependIcon(propagateIco);
        }
        prevPageObj.append(draggableIcon);
        this.setDisabledCheckingLimits(true);
        this.transitioning = true;
        goPrev(this.onNavigationEnd);
      } else if (this.transitioning) {
        this.isDisabledDrop = true;
      } else {
        this.isDisabledDrop = false;
      }
    }