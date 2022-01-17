function(event) {
    var self = $(this), container;

    if(self.is('a[data-pjax]'))
    {
      container = self.attr('data-pjax');
    }
    else
    {
      container = self.closest('[data-pjax-container]').attr('data-pjax-container');
    }
    
    if (container !== 'false') {
      return $.pjax.click(event, container);
    }
  }