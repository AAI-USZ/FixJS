function (evt) {
        var idx = $(node.el).find('.nav-tabs .active').data('idx');
        evt.preventDefault();
        node.deleteArrayItem(idx);
        updateTabs();
      }