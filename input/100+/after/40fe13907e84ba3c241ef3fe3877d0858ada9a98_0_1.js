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
        if(txt&&txt.indexOf('data-tables')!=-1){		
            spanSize = leftInAuthor = txt.length;        
        }
        else if (spanSize > leftInAuthor){
            spanSize = leftInAuthor;
        }			
        var curTxt = txt.substring(0, spanSize);
        txt = txt.substring(spanSize);				
	if(curTxt&&curTxt.indexOf('data-tables')!=-1){		
		nextAfterAuthorColors(curTxt,extraClasses );			
	}else{
		nextAfterAuthorColors(curTxt, (cls && cls + " ") + extraClasses);
	}
        curIndex += spanSize;
        leftInAuthor -= spanSize;
        if (leftInAuthor == 0)
        {
          nextClasses();
        }
      }
    }