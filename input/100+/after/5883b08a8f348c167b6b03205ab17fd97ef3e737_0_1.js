function expand(id, url, container, moveToTop) {
    if(Session.get("highlighted")) { // We have an existing blown up image
      shrinkPhoto = $('#'+Session.get("highlighted"))
      shrinkPhoto.removeClass('highlighted');
      shrinkPhoto.css({width:220});
      //shrinkPhoto.animate({width:220}, animation_ms);
    }
    if(Session.get("highlighted") != id) { // We're blowing up a new image
      if (moveToTop) { addSidebarSelection(url); }
      bigPhotoSelector = '#'+id;
      bigPhoto = $(bigPhotoSelector);
      bigPhoto.addClass('highlighted')

      var height = bigPhoto.outerHeight();
      var width = bigPhoto.outerWidth();

      var max_height = $(window).height() - 20;
      var width_for_max_height = width * max_height / height;
      //alert(width_for_max_height)
      width = Math.round(Math.min(container.innerWidth()-70, width_for_max_height));
      width = width+'px';
      bigPhoto.css({width: width});
      //    bigPhoto.animate({width: width}, animation_ms, function() {
      container.masonry('reload')
      setTimeout('scroll_to("'+bigPhotoSelector+'");',300);
      setTimeout('scroll_to("'+bigPhotoSelector+'");',700);
      //});
      Session.set("highlighted", id)
   } else { // We're shrinking the highlighted image
     if (container.attr('id') == 'sidebarphotos') { // shink sidebar if closing last photo
       $('#photofeed').css('width', '72%');
       $('#sidebar').css('width', '27%');
       setTimeout('$("#photofeed").masonry("reload");', 500);
     }
     Session.set("highlighted", null);
     setTimeout('$("#'+container.attr('id')+'").masonry("reload");', 300);
   }
   setTimeout('$("#photofeed").masonry("reload");', 200);
   setTimeout('$("#sidebarphotos").masonry("reload");', 200);
   container.masonry('reload')
  }