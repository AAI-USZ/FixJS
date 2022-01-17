function(frame, scene) {
      if (this !== instance)
        return;
      paused = true;
      if (isNaN(frame))
        return this.gotoLabel(frame);
      gotoFrame.call(instance, frame);
    }