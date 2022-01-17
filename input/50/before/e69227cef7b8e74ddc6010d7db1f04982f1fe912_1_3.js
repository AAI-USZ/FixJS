function() {
        this.remove();
        // Instead calling destroy, we just call save
        // because it is removed already. 
        //We don't want to remove it twice.
        // The first time is not synced.
        this.model.save();
        // Call resize so that iScroller works correctly
        this.titles.folder.resize();
      }