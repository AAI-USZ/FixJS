function() {
        $(this.el).append(_.template(PhotosTemplate, null));
        var that = this;
        _.each(this.collection.models, function(item) {
          that.renderItem(item);
        });
        this.selectByIndex(1);
      }