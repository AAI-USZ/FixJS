function(e) {
      e.preventDefault();

      var d = new HAL.Views.QueryUriDialog({
        href: $(e.target).attr('href')
      }).render();

      d.$el.dialog({
        title: 'Query URI Template',
        width: 400
      });
      window.foo = d;
    }