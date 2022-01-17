function(id) {
      var htmlId = 'calendar-' + id;
      var el = document.getElementById(htmlId);
      if (el) {
        el.parentNode.removeChild(el);
      }
    }