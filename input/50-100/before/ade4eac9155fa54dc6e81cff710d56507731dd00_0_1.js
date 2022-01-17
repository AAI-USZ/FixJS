function(evt) {
      var $this = $(this),
      target = $this.attr('href'),
      targetId = target.substring(1);
      
      if (document.getElementById(targetId) === null) return false;
      
      // Push history
      $.bbq.pushState('/' + targetId, 2);
      
      // Prevent default behaviour
      evt.preventDefault();
    }