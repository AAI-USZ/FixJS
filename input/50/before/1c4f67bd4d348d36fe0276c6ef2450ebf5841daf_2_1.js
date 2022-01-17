function(frame) {
      if (this !== instance)
        return;
      paused = false;
      if (!+frame)
        return this.gotoLabel(frame);
      gotoFrame.call(instance, frame);
    }