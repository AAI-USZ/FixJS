function() {
      var selector = this.get('selector');
      queryObject = SC.CoreQuery(selector);
      if(queryObject.length == 0) throw new Error('ERROR: Could not find ' + selector + ' on the page');
      if(queryObject.length > 1) throw new Error('ERROR: Page has multiple elements that match ' + selector);
      return queryObject.html();
    }