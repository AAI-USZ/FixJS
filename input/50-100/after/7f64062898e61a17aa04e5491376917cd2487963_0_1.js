function() {
        // Stay within the bounds of the UL
        if(this.index < this.collection.length) {
          this.index++;
          console.log(this.index);
          var photoId = $('#gallery ul li:nth-child(' + this.index + ')').attr('data-photo-id');
          Backbone.history.navigate("photo/" + photoId, {silent: true, trigger: true});      
        }
        return false;
      }