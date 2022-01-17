function (target) {
      var inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'],
      filtered = target.attr('class').split(' ').map(function (el, i) {
        if ($.inArray(el, inheritables) !== -1) {
          return el;
        }
      }).join(' ');
      return $.trim(filtered);
    }