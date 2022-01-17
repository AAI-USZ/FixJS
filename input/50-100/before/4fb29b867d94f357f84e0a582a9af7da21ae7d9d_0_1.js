function initGallery(data) {
      var $gallery = $('#gallery');

//      var template = $('#template-mason-brick').html();
      $.each(initdata, function(i,x){
        var h = Mustache.to_html(template, x);
        $gallery = $gallery.append(h);
      });
      $gallery.masonry('reload');

      $gallery.imagesLoaded(function(){
        $gallery.masonry({
          itemSelector : '.item',
          columnWidth: 240
        });
      });
    }