function(on_finished, skip_slide) {
      var doOpen,
        _this = this;
      if (!this.node.is_open) {
        this.node.is_open = true;
        this.getButton().removeClass('closed');
        doOpen = function() {
          var event;
          _this.getLi().removeClass('closed');
          if (on_finished) {
            on_finished();
          }
          event = $.Event('tree.open');
          event.node = _this.node;
          return _this.tree_element.trigger(event);
        };
        if (skip_slide) {
          return doOpen();
        } else {
          return this.getUl().slideDown('fast', doOpen);
        }
      }
    }