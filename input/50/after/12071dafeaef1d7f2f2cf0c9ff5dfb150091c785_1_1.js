function() {
      var list = $();
      list = $(document.createElement('li'));
      list.addClass(this.odd ? 'odd' : 'even');
      return list;
    }