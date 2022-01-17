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