function (evt) {
        var idx = $(node.el).find('.nav-tabs .active').data('idx');
        evt.preventDefault();
        evt.stopPropagation();
        node.deleteArrayItem(idx);
        updateTabs();
      }