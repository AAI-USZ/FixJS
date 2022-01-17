function(frame) {
      if (this !== instance)
        return;
      paused = false;
      if (isNaN(frame))
        return this.gotoLabel(frame);
      gotoFrame.call(instance, frame);
    }