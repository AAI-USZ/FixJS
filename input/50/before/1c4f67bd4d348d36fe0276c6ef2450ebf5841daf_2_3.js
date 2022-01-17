function(label) {
      if (this !== instance)
        return;
      if (!(label in timelineLoader.frameLabels))
        return; // label is not found, skipping ?
      gotoFrame.call(instance, timelineLoader.frameLabels[label]);
    }