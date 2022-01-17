function() {
        this.adjustDimensions();
        if (this.cur > 0) {
          tapeOffset -= this.currentTrack * 125;
        }
        return tapebox.css({
          left: tapeOffset
        });
      }