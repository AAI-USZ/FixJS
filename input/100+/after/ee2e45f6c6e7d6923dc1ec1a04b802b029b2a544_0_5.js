function initGallery(data) {
      var $gallery = $('#gallery');

      $.each(initdata, function(i,x){
        var h = Mustache.to_html(template, x);
        $gallery = $gallery.append(h);
      });

      $gallery.imagesLoaded(function(){
        $gallery.masonry({
          itemSelector : '.box',
          columnWidth: 230,
          cornerStampSelector: '.corner-stamp'
        });
      });

      $gallery.infinitescroll({
        navSelector  : '#page-nav',    // selector for the paged navigation
        nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
        itemSelector : '.item',     // selector for all items you'll retrieve
        dataType     : 'json',
        loading      : {
            finishedMsg: 'No more pages to load.',
            img: '/img/loading.gif'
        },
        template     : function(data) {
          var $div = $('<div/>')
          $.each(data, function(i,x){
            $div.append(Mustache.to_html(template, x));
          });
          return $div
          },
        },
        function( newElements ) {
          var $newElems = $( newElements ).css({ opacity: 0 });
          $newElems.imagesLoaded(function(){

            if (inSelectMode()) {
              $($newElems.children()).each(function (idx, item) { attachItemSelectActions(item); });
            } else {
              $($newElems.children()).each(function (idx, item) { attachItemActions(item); });
            }

            $newElems.animate({ opacity: 1 });
            $('#gallery').masonry('appended', $newElems, true );
          });
        }
      );

      attachItemsActions();
    }