function(index) {
      var noteId = $(this).attr("id");
      var anchorId = "note-anchor-" + noteId.substring(5);
      var anchor = $("#" + anchorId);

      // the first note just gets positioned directly.
      if (lastTop === -1) {
         top = anchor.position().top - scrollPos + scrollTop;
      } else {
         // all others are positioned relateve and need to bump
         // their top pos by the accumulated height of all others
         var newTop = anchor.position().top - scrollPos + scrollTop;
         if (newTop <= (lastTop + totalHeight)) {
            // this overlaps the prior note. Just bump the top
            // 5 piles down (relative to the prior)
            top += 5;
         } else {
            top += (newTop - lastTop);
            top -= totalHeight;
         }
      }

      if (firstTop === -1) {
         firstTop = top;
      }

      showAndAlign(top, $(this), 'note', $("#note-boxes"));
      totalHeight += $(this).outerHeight();
      lastTop = top;
   }