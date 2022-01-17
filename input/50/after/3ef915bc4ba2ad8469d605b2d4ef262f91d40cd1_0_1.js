function(index) {
        this.index = index+1;
        var galleryItemsEl = $('#gallery ul li');
        galleryItemsEl.removeClass('active');
        $(galleryItemsEl.get(index)).addClass('active');  
      }