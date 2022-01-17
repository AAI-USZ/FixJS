function(e) {
      var editBox, markerDescBox, parent, this_;
      this_ = $(e.currentTarget);
      parent = this.wrap;
      markerDescBox = parent.find('.marker-desc');
      editBox = parent.find('.edit-form');
      if (this_.hasClass('active')) {
        markerDescBox.addClass('active');
        this_.removeClass('active');
        return editBox.removeClass('active');
      } else {
        markerDescBox.removeClass('active');
        this_.addClass('active');
        return editBox.addClass('active');
      }
    }