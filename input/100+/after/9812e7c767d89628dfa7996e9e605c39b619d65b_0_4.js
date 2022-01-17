function() {
      notify('details.show');
      var href = this.href;
      var id = href.slice(href.indexOf('#'));
      var $target = $(id);
      var scrollTop = $deatilsPanel.scrollTop;
      var top = $target.getClientRect().top + scrollTop;
      new Animation().addClip(Fx.base(function(x, y) {
        $deatilsPanel.scrollTop = scrollTop + ((top - 50) - scrollTop) * y;
      }), 0, 200, 'easeInOut')
          .on('playfinish', function() {
            $target.getFirst().highlight()
          })
          .play();
      return false;
    }