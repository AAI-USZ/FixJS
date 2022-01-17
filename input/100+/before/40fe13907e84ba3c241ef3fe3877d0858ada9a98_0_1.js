function(txt, cls)
    {
      while (txt.length > 0)
      {
        if (leftInAuthor <= 0)
        {
          // prevent infinite loop if something funny's going on
          return nextAfterAuthorColors(txt, cls);
        }
        var spanSize = txt.length;
        if (spanSize > leftInAuthor)
        {
          spanSize = leftInAuthor;
        }
        var curTxt = txt.substring(0, spanSize);
        txt = txt.substring(spanSize);
        nextAfterAuthorColors(curTxt, (cls && cls + " ") + extraClasses);
        curIndex += spanSize;
        leftInAuthor -= spanSize;
        if (leftInAuthor == 0)
        {
          nextClasses();
        }
      }
    }