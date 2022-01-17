function(photo, callback) {
      var curr_scroll_left = this._photosHolder.scrollLeft() - this._ui.offset().left;

      var scroll_to = (photo.offset().left + curr_scroll_left) - ((this._photosHolder.width() / 2) - (photo.width() / 2));

      if (J.IsFunction(callback))
        this._photosHolder.animate({ scrollLeft : scroll_to }, callback);
      else
        this._photosHolder.animate({ scrollLeft : scroll_to });
        
    }