function() {
        this.remove();
        // Instead calling destroy, we just call save
        // because it is removed already. 
        //We don't want to remove it twice.
        // The first time is not synced.
        this.model.save();
        var items = manager.folders.items,
            pos   = items.indexOf(this);
        if(pos >= 0)
          items.splice(pos, 1);
        manager.folders.resize();
      }