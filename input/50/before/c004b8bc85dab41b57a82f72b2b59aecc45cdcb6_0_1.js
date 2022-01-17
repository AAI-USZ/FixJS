function(showdown) {
      if (showdown) lit.renderComment = showdown.makeHtml;
      lit.amd = true;
      return lit;
    }