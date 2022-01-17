function() {
        this.remove();
        this.model.destroy();
        var items = manager.folders.items,
            pos   = items.indexOf(this);
        if(pos >= 0)
          items.splice(pos, 1);
        manager.folders.resize();
      }