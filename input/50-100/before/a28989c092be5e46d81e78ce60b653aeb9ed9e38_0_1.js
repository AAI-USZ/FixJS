function() {
      var selector = this.get('selector');
      return SC.CoreQuery(selector).html();
    }