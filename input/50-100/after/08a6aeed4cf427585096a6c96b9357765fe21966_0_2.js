function(e) {
      e.preventDefault();

      var $target = $(e.target);
      var uri = $target.attr('href') || $target.parent().attr('href');

      var d = new HAL.Views.QueryUriDialog({
        href: uri
      }).render();

      d.$el.dialog({
        title: 'Query URI Template',
        width: 400
      });
      window.foo = d;
    }