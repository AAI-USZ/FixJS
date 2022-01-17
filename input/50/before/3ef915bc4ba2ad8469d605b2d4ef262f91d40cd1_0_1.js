function(index) {
        this.index = index;
        var galleryItemsEl = $('#gallery ul li');
        galleryItemsEl.removeClass('active');
        $(galleryItemsEl.get(index)).addClass('active');  
      }