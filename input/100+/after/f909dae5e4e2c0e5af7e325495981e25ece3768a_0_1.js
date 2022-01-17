function() {
      
      /* get arguments */
      
      var maxLength = args['maxLength'] ? args['maxLength'] : 300;
      var ellipsis = args['ellipsis'] ? args['ellipsis'] : '&hellip;';
      var more = args['more'] ? args['more'] : 'Read more';
      var less = args['less'] ? args['less'] : 'Read less';
      var htmlClass = args['htmlClass'] ? args['htmlClass'] : '';
      var textClass = args['textClass'] ? args['textClass'] : '';
      var moreClass = args['moreClass'] ? args['moreClass'] : '';
      var lessClass = args['lessClass'] ? args['lessClass'] : '';
      var showDuration = args['showDuration'] ? args['showDuration'] : 0;
      var hideDuration = args['hideDuration'] ? args['hideDuration'] : 0;
      
      /* get html and text */
      
      var element = $(this);
      var html = element.html();
      var text = html.replace(/(<([^>]+)>)|\n/ig,'')
      
      /* only do truncation if text length exceeds specified max length */
      
      if (text.length > maxLength) {
        
        /* set truncated text */
        
        text = text.trim().substr(0, maxLength) + ellipsis;
        element.html('');
        
        /* create truncated text element */
        
        var textElement = $(document.createElement('div'));
        textElement.html(text);
        textElement.attr('class', textClass)
        element.append(textElement);
        
        /* create more link container */
        
        var moreContainer = $(document.createElement('div'));
        moreContainer.attr('class', moreClass);
        
        /* create more link */
        
        var moreLink = $(document.createElement('a'));
        moreLink.html(more);
        moreLink.attr('href', '#');
        moreLink.attr('style', 'cursor: pointer');
        moreLink.click(function() {
          textElement.hide();
          htmlElement.show(showDuration);
          moreContainer.hide();
          lessContainer.show();
          return false;
        })
        
        /* append more link */
        
        moreContainer.append(moreLink);
        
        /* append more container */
        
        element.append(moreContainer);
        
        /* create full html element */
        
        var htmlElement = $(document.createElement('div'));
        htmlElement.html(html);
        htmlElement.attr('class', htmlClass);
        htmlElement.attr('style', 'display: none');
        element.append(htmlElement);
        
        /* create less link container */
        
        var lessContainer = $(document.createElement('div'));
        lessContainer.attr('class', lessClass);
        lessContainer.attr('style', 'display: none');
        
        /* create less link */
        
        var lessLink = $(document.createElement('a'));
        lessLink.html(less);
        lessLink.attr('href', '#');
        lessLink.attr('style', 'cursor: pointer');
        lessLink.click(function() {
          htmlElement.hide(hideDuration);
          textElement.show();
          lessContainer.hide();
          moreContainer.show();
          return false;
        })
        
        /* append less link */
        
        lessContainer.append(lessLink);
        
        /* append less container */
        
        element.append(lessContainer);
      }
    }