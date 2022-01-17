function (td) {

        if (!selection.isSelected()) {

          return false;

        }



        var $td = $(td);

        var tdOffset = $td.offset();

        var scrollLeft = priv.scrollable.scrollLeft(); //scrollbar position

        var scrollTop = priv.scrollable.scrollTop(); //scrollbar position

        var scrollWidth = priv.scrollable.outerWidth() - 24; //24 = scrollbar

        var scrollHeight = priv.scrollable.outerHeight() - 24; //24 = scrollbar

        var scrollOffset = priv.scrollable.offset();



        var rowHeaderWidth = self.blockedCols ? $(self.blockedCols.main[0].firstChild).outerWidth() : 2;

        var colHeaderHeight = self.blockedRows ? $(self.blockedRows.main[0].firstChild).outerHeight() : 2;



        var offsetTop = tdOffset.top;

        var offsetLeft = tdOffset.left;

        if (scrollOffset) { //if is not the window

          offsetTop += scrollTop - scrollOffset.top;

          offsetLeft += scrollLeft - scrollOffset.left;

        }



        var height = $td.outerHeight();

        var width = $td.outerWidth();



        if (scrollLeft + scrollWidth <= offsetLeft + width) {

          setTimeout(function () {

            priv.scrollable.scrollLeft(offsetLeft + width - scrollWidth);

          }, 1);

        }

        else if (scrollLeft > offsetLeft - rowHeaderWidth) {

          setTimeout(function () {

            priv.scrollable.scrollLeft(offsetLeft - rowHeaderWidth);

          }, 1);

        }



        if (scrollTop + scrollHeight <= offsetTop + height) {

          setTimeout(function () {

            priv.scrollable.scrollTop(offsetTop + height - scrollHeight);

          }, 1);

        }

        else if (scrollTop > offsetTop - colHeaderHeight) {

          setTimeout(function () {

            priv.scrollable.scrollTop(offsetTop - colHeaderHeight);

          }, 1);

        }

      }