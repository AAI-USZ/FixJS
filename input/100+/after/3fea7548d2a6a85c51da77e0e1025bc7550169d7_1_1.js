function(results) {
        var container, widget;
        widget = this;
        container = jQuery('imageThumbnailContainer ul', this.element);
        container.prepend(jQuery('<div class="pager-prev" style="display:none"></div>'));
        container.append(jQuery('<div class="pager-next" style="display:none"></div>'));
        if (results.offset > 0) {
          jQuery('.pager-prev', container).show();
        }
        if (results.offset < results.total) {
          jQuery('.pager-next', container).show();
        }
        jQuery('.pager-prev', container).click(function(event) {
          return widget.options.searchCallback(query, widget.options.limit, response.offset - widget.options.limit, function(results) {
            return widget._showResults(results);
          });
        });
        return jQuery('.pager-next', container).click(function(event) {
          return widget.options.searchCallback(query, widget.options.limit, response.offset + widget.options.limit, function(results) {
            return widget._showResults(results);
          });
        });
      }