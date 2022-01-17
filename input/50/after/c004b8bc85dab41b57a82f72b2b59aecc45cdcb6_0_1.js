function(Showdown) {
      if (Showdown) {
        var converter = new Showdown.converter();
        lit.renderComment = converter.makeHtml
      }
      lit.amd = true;
      return lit;
    }