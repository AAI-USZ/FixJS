function(label) {
      if (this !== instance)
        return;
      label = label.toLowerCase(); // labels are case insensitive
      if (!(label in timelineLoader.frameLabels))
        return; // label is not found, skipping ?
      gotoFrame.call(instance, timelineLoader.frameLabels[label]);
    }