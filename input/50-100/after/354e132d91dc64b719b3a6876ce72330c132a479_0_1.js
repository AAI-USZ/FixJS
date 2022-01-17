function(i,v) {
      var id = $(v).attr('id');
      var klass = _this.prefix + '-' + id;
      var repeat = $(v);
      if ($('.' + klass).length > 0) return; // Already in the view
      
      // Change ID to a serial one
      repeat.attr('id', id + '-' + i);
      
      // Change previous ID to a namespaced class
      repeat.addClass(klass);
      
      $('body').append(repeat);
    }