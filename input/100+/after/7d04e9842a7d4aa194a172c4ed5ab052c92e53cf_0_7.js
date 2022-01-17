function(e) {
      var buttons, editBox, markerDescBox, parent, shareBox, this_;
      this_ = $(e.currentTarget);
      parent = this.wrap;
      buttons = parent.find('.button');
      markerDescBox = parent.find('.marker-desc');
      editBox = parent.find('.edit-form');
      shareBox = parent.find('.share-input');
      if (this_.hasClass('active')) {
        markerDescBox.addClass('active');
        buttons.removeClass('active');
        editBox.removeClass('active');
        return shareBox.removeClass('active');
      } else {
        buttons.removeClass('active');
        markerDescBox.removeClass('active');
        editBox.removeClass('active');
        this_.addClass('active');
        return shareBox.addClass('active');
      }
    }