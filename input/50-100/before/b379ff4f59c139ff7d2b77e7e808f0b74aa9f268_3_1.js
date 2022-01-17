function toggleShowContentFct(e){
      e.toggleClass("open");
      var content = $(".hiddenContent", e.parent().get(0));
      if (content.is(':visible')) {
        content.slideUp(100);
      }
      else {
        content.slideDown(100);
      }
    }