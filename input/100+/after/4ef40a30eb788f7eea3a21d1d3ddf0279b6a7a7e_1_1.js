function () {
        priv.editProxy.height(priv.editProxy.parent().innerHeight() - 4);
        priv.editProxy.val(datamap.getText(priv.selStart, priv.selEnd));
        setTimeout(editproxy.focus, 1);

        if (priv.settings.autoComplete) {
          var typeahead = priv.editProxy.data('typeahead');
          if (!typeahead) {
            priv.editProxy.typeahead({
              updater: function (item) {
                priv.lastAutoComplete = item;
                return item
              }
            });
            typeahead = priv.editProxy.data('typeahead');
          }
          typeahead.source = [];
          for (var i = 0, ilen = priv.settings.autoComplete.length; i < ilen; i++) {
            if (priv.settings.autoComplete[i].match(priv.selStart.row, priv.selStart.col, self.getData)) {
              typeahead.source = priv.settings.autoComplete[i].source();
              typeahead.highlighter = priv.settings.autoComplete[i].highlighter || defaultAutoCompleteHighlighter;
              break;
            }
          }
        }

        var current = grid.getCellAtCoords(priv.selStart);
        var $current = $(current);
        var currentOffset = $current.offset();
        var containerOffset = container.offset();
        var scrollTop = container.scrollTop();
        var scrollLeft = container.scrollLeft();
        var editTop = currentOffset.top - containerOffset.top + scrollTop - 1;
        var editLeft = currentOffset.left - containerOffset.left + scrollLeft - 1;

        if(editTop < 0) {
          editTop = 0;
        }
        if(editLeft < 0) {
          editLeft = 0;
        }

        var width, height;
        if (priv.editProxy.autoResize) {
          width = $current.width();
          height = $current.outerHeight() - 4;
        }
        else {
          width = $current.width() * 1.5;
          height = $current.height();
        }

        if (parseInt($current.css('border-top-width')) > 0) {
          if(self.blockedRows.count() > 0) {
            editTop += 1;
          }
          height -= 1;
        }
        if (parseInt($current.css('border-left-width')) > 0) {
          if(self.blockedCols.count() > 0) {
            editLeft += 1;
          }
          width -= 1;
        }

        if (priv.editProxy.autoResize) {
          priv.editProps = {
            maxHeight: 200,
            minHeight: height,
            minWidth: width,
            maxWidth: Math.max(168, width),
            animate: false,
            extraSpace: 0
          };
        }
        else {
          priv.editProps = {
            width: width,
            height: height
          };
        }

        priv.editProxyHolder.addClass('htHidden');
        priv.editProxyHolder.css({
          top: editTop,
          left: editLeft,
          overflow: 'hidden'
        });
        priv.editProxy.css({
          width: '1000px',
          height: '1000px'
        });
      }