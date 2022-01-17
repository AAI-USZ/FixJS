function toggleShowContentFct(outerElement){
      var content = $(".hiddenContent", outerElement);
      var vis = $(":visible", content);
      if (vis.length > 0) {
        content.slideUp(100);
        $(".showElement", outerElement).show();
        $(".hideElement", outerElement).hide();
      }
      else {
        content.slideDown(100);
        $(".showElement", outerElement).hide();
        $(".hideElement", outerElement).show();
      }
    }