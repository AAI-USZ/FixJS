function(size) {
      curTextFont = PFont.get(curFontName, size);
      curTextSize = size;
      // recache metrics
      curTextAscent = curTextFont.ascent;
      curTextDescent = curTextFont.descent;
      curTextLeading = curTextFont.leading;
      var curContext = drawing.$ensureContext();
      curContext.font = curTextFont.css;
    }