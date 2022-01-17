function() {
      var i, maxPageSize, opts, _i, _ref,
        _this = this;
      opts = this.options;
      maxPageSize = this._getMaxPageSize();
      switch (opts.direction) {
        case "matrix":
          this.matrixRow = m.ceil(m.sqrt(this.totalPages));
          this.matrixColumn = m.ceil(this.totalPages / this.matrixRow);
          this.pagesOuterWidth = maxPageSize.width * this.matrixRow;
          this.pagesOuterHeight = maxPageSize.height * this.matrixColumn;
          this.handler.width(this.pagesOuterWidth).height(this.pagesOuterHeight);
          if (!opts.responsive) {
            this.pagesHandler.each(function(i, elem) {
              var _h, _w;
              elem = $(elem);
              _w = elem.outerWidth();
              _h = elem.outerHeight();
              if (_w < maxPageSize.width) {
                elem.css({
                  'margin-left': (maxPageSize.width - _w) / 2,
                  'margin-right': (maxPageSize.width - _w) / 2
                });
              }
              if (_h < maxPageSize.height) {
                elem.css({
                  'margin-top': (maxPageSize.height - _h) / 2,
                  'margin-bottom': (maxPageSize.height - _h) / 2
                });
              }
              return elem = null;
            });
          }
          this.pagesHandler.width(maxPageSize.width).height(maxPageSize.height);
          for (i = _i = _ref = this.matrixColumn; _ref <= 1 ? _i <= 1 : _i >= 1; i = _ref <= 1 ? ++_i : --_i) {
            $('<br class="matrix-break-point" style="clear:both;">').insertAfter(this.pagesHandler.eq((i - 1) * this.matrixRow - 1));
          }
          this.workspace.width(maxPageSize.width).height(maxPageSize.height);
          break;
        case "vertical":
          this.pagesOuterWidth = maxPageSize.width;
          if (!opts.responsive) {
            this.pagesHandler.each(function(i, elem) {
              var _h, _w;
              elem = $(elem);
              _h = elem.outerHeight(true);
              _w = elem.outerWidth(true);
              _this.pagesOuterHeight += _h;
              if (_w < maxPageSize.width) {
                elem.css('margin-left', (maxPageSize - _w) / 2);
              }
              return elem = null;
            });
          }
          this.pagesOuterHeight = this.pagesHandler.size() * maxPageSize.height;
          this.pagesHandler.width(maxPageSize.width).height(maxPageSize.height);
          this.handler.height(this.pagesOuterHeight).width(this.pagesOuterWidth).css('top', (maxPageSize.height - this.pagesHandler.eq(0).outerHeight(true)) / 2);
          this.workspace.width(maxPageSize.width);
          break;
        case "horizontal":
          this.pagesOuterHeight = maxPageSize.height;
          if (!opts.responsive) {
            this.pagesHandler.each(function(i, elem) {
              var _h, _w;
              elem = $(elem);
              _w = elem.outerWidth(true);
              _h = elem.outerHeight(true);
              _this.pagesOuterWidth += _w;
              if (_h < maxPageSize.height) {
                elem.css('margin-top', (maxPageSize.height - _h) / 2);
              }
              return elem = null;
            });
          }
          this.pagesOuterWidth = this.pagesHandler.size() * maxPageSize.width;
          this.pagesHandler.width(maxPageSize.width).height(maxPageSize.height);
          this.handler.width(this.pagesOuterWidth).height(this.pagesOuterHeight).css('left', (maxPageSize.width - this.pagesHandler.eq(0).outerWidth(true)) / 2);
          this.workspace.height(maxPageSize.height);
      }
      return this.boundry = {
        top: this.workspace.position().top,
        left: this.workspace.position().left,
        right: this.workspace.position().left + this.workspace.width(),
        bottom: this.workspace.position().top + this.workspace.height()
      };
    }