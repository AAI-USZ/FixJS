function() {
      var that = this;
      //this.folders
      that.$('.del-cancel').click(function() {
        that.close();
      });
      that.$('.del-confirm').click(function() {
        manager.metadataList.remove(that.papers.models);
        manager.tagList.remove(that.folders.models);
        that.close();
      });
      // Listen to event that updates counter
      this.folders.bind('add',    this.render, this)
                  .bind('remove', this.render, this)
                  .bind('reset',  this.render, this);
      this.papers .bind('add',    this.render, this)
                  .bind('remove', this.render, this)
                  .bind('reset',  this.render, this);
    }