function(i,v) {
      var id = $(v).attr('id');
      if ($('#' + id).length > 0) return; // Already in the view
      var repeat = $(v);
      
      // Change ID to a serial one
      repeat.attr('id', id + '-' + i);
      
      // Change previous ID to a namespaced class
      repeat.addClass(_this.prefix + '-' + id);
      
      $('body').append(repeat);
    }