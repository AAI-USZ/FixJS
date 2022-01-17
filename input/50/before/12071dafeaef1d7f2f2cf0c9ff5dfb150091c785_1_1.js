function() {
      var list = $();
      if (this.id) {
        list = $(document.createElement('li'));
        list.addClass(this.odd ? 'odd' : 'even');
      }
      return list;
    }