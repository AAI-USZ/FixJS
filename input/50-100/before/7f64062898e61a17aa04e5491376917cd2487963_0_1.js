function() {
        var that = this;
        // Stay within the bounds of the UL
        if(that.index < that.collection.length) {
          that.index++;
          var photoId = $('#gallery ul li:nth-child(' + that.index + ')').attr('data-photo-id');
          Backbone.history.navigate("photo/" + photoId, {silent: true, trigger: true});      
        }
        return false;
      }