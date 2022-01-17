function(frame, scene) {
      if (this !== instance)
        return;
      paused = true;
      if (!+frame)
        return this.gotoLabel(frame);
      gotoFrame.call(instance, frame);
    }