function () {
      function onMouseEnterTable() {
        priv.isMouseOverTable = true;
      }

      function onMouseLeaveTable() {
        priv.isMouseOverTable = false;
      }

      self.curScrollTop = self.curScrollLeft = 0;
      self.lastScrollTop = self.lastScrollLeft = null;

      var div = $('<div><table cellspacing="0" cellpadding="0"><thead></thead><tbody></tbody></table></div>');
      priv.tableContainer = div[0];
      self.table = $(priv.tableContainer.firstChild);
      priv.tableBody = self.table.find("tbody")[0];
      self.table.on('mousedown', 'td', interaction.onMouseDown);
      self.table.on('mouseover', 'td', interaction.onMouseOver);
      self.table.on('dblclick', 'td', interaction.onDblClick);
      container.append(div);

      self.colCount = settings.cols;
      self.rowCount = 0;

      highlight.init();
      priv.currentBorder = new Border(container, {
        className: 'current',
        bg: true
      });
      if (priv.settings.fillHandle) {
        autofill.init();
      }
      editproxy.init();

      self.blockedCols = new handsontable.BlockedCols(self);
      self.blockedRows = new handsontable.BlockedRows(self);
      this.updateSettings(settings);

      container.on('mouseenter', onMouseEnterTable).on('mouseleave', onMouseLeaveTable);
      $(priv.currentBorder.main).on('dblclick', interaction.onDblClick);

      function onMouseUp() {
        if (priv.isMouseDown) {
          setTimeout(editproxy.focus, 1);
        }
        priv.isMouseDown = false;
        if (priv.fillHandle && priv.fillHandle.isDragged) {
          if (priv.fillHandle.isDragged > 1) {
            autofill.apply();
          }
          priv.fillHandle.isDragged = 0;
        }
      }

      function onOutsideClick(event) {
        setTimeout(function () {//do async so all mouseenter, mouseleave events will fire before
          if (!priv.isMouseOverTable || event.target === priv.tableContainer) { //if clicked outside the table or directly at container which also means outside
            selection.deselect();
          }
        }, 1);
      }

      $("html").on('mouseup', onMouseUp);
      $("html").on('click', onOutsideClick);

      if (container[0].tagName.toLowerCase() !== "html" && container[0].tagName.toLowerCase() !== "body" && container.css('overflow') === 'scroll') {
        priv.scrollable = container;
      }
      else {
        container.parents().each(function () {
          if (this.tagName.toLowerCase() !== "html" && this.tagName.toLowerCase() !== "body" && $(this).css('overflow') == 'scroll') {
            priv.scrollable = $(this);
            return false;
          }
        });
      }

      if (priv.scrollable) {
        priv.scrollable.scrollTop(0);
        priv.scrollable.scrollLeft(0);

        priv.scrollable.on('scroll.handsontable', function () {
          self.curScrollTop = priv.scrollable[0].scrollTop;
          self.curScrollLeft = priv.scrollable[0].scrollLeft;

          if (self.blockedRows && self.curScrollTop !== self.lastScrollTop) {
            self.blockedRows.refreshBorders();
            self.blockedRows.main[0].style.top = self.curScrollTop + 'px';
          }

          if (self.blockedCols && self.curScrollLeft !== self.lastScrollLeft) {
            self.blockedCols.refreshBorders();
            self.blockedCols.main[0].style.left = self.curScrollLeft + 'px';
          }

          if (priv.cornerHeader && (self.curScrollTop !== self.lastScrollTop || self.curScrollLeft !== self.lastScrollLeft)) {
            if (self.curScrollTop === 0 && self.curScrollLeft === 0) {
              priv.cornerHeader.find('th').css({borderBottomWidth: 0, borderRightWidth: 0});
            }
            else if (self.lastScrollTop === 0 && self.lastScrollLeft === 0) {
              priv.cornerHeader.find('th').css({borderBottomWidth: '1px', borderRightWidth: '1px'});
            }
            priv.cornerHeader[0].style.top = self.curScrollTop + 'px';
            priv.cornerHeader[0].style.left = self.curScrollLeft + 'px';
          }

          self.lastScrollTop = self.curScrollTop;
          self.lastScrollLeft = self.curScrollLeft;
        });
        priv.scrollable.trigger('scroll.handsontable');
      }
      else {
        priv.scrollable = $(window);
        if (priv.cornerHeader) {
          priv.cornerHeader.find("th").css({borderBottomWidth: 0, borderRightWidth: 0});
        }
      }

      priv.scrollable.on('scroll', function (e) {
        e.stopPropagation();
      });

      if (priv.settings.contextMenu) {
        var onContextClick = function (key) {
          var coords = grid.getCornerCoords([priv.selStart, priv.selEnd]);

          switch (key) {
            case "row_above":
              grid.alter("insert_row", coords.TL);
              break;

            case "row_below":
              grid.alter("insert_row", {row: coords.BR.row + 1, col: 0});
              break;

            case "col_left":
              grid.alter("insert_col", coords.TL);
              break;

            case "col_right":
              grid.alter("insert_col", {row: 0, col: coords.BR.col + 1});
              break;

            case "remove_row":
            case "remove_col":
              grid.alter(key, coords.TL, coords.BR);
              break;

            case "undo":
            case "redo":
              priv.undoRedo[key]();
              break;
          }
        };

        var isDisabled = function (key) {
          if (self.blockedCols && self.blockedCols.main.find('th.htRowHeader.active').length && (key === "remove_col" || key === "col_left" || key === "col_right")) {
            return true;
          }

          if (self.blockedRows && self.blockedRows.main.find('th.htColHeader.active').length && (key === "remove_row" || key === "row_above" || key === "row_below")) {
            return true;
          }

          if (priv.selStart) {
            var coords = grid.getCornerCoords([priv.selStart, priv.selEnd]);
            if (((key === "row_above" || key === "remove_row") && coords.TL.row === 0) || ((key === "col_left" || key === "remove_col") && coords.TL.col === 0)) {
              if ($(grid.getCellAtCoords(coords.TL)).data("readOnly")) {
                return true;
              }
            }
            return false;
          }

          return true;
        };

        var allItems = {
          "undo": {name: "Undo", disabled: function () {
            return priv.undoRedo ? !priv.undoRedo.isUndoAvailable() : true
          }},
          "redo": {name: "Redo", disabled: function () {
            return priv.undoRedo ? !priv.undoRedo.isRedoAvailable() : true
          }},
          "sep1": "---------",
          "row_above": {name: "Insert row above", disabled: isDisabled},
          "row_below": {name: "Insert row below", disabled: isDisabled},
          "sep2": "---------",
          "col_left": {name: "Insert column on the left", disabled: isDisabled},
          "col_right": {name: "Insert column on the right", disabled: isDisabled},
          "sep3": "---------",
          "remove_row": {name: "Remove row", disabled: isDisabled},
          "remove_col": {name: "Remove column", disabled: isDisabled}
        };

        if (priv.settings.contextMenu === true) { //contextMenu is true, not an array
          priv.settings.contextMenu = ["row_above", "row_below", "sep2", "col_left", "col_right", "sep3", "remove_row", "remove_col"]; //use default fields array
        }

        var items = {};
        for (var i = 0, ilen = priv.settings.contextMenu.length; i < ilen; i++) {
          items[priv.settings.contextMenu[i]] = allItems[priv.settings.contextMenu[i]];
        }

        $.contextMenu({
          selector: container.attr('id') ? ("#" + container.attr('id')) : "." + container[0].className.replace(/[\s]+/g, '.'),
          trigger: 'right',
          callback: onContextClick,
          items: items
        });
      }

      self.container.on("datachange.handsontable", function (event, changes) {
        if (priv.settings.onChange) {
          priv.settings.onChange(changes);
        }
      });
    }