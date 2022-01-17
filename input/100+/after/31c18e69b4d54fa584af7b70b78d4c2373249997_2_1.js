function () {
                
                var _self = this,
                    columns = _self.getColumns(),
                    width = _self.get('width'),
                    allowScroll = _self._isAllowScrollLeft();

                //if there is not a width config of grid ,The forceFit action can't work
                if (width) {

                    if (allowScroll) {
                        width -= CLS_SCROLL_WITH;
                    }

                    var adjustCount = 0;

                    S.each(columns, function (column) {
                        if (column.get('visible') && column.get('resizable')) {
                            adjustCount++;
                        }
                        if (column.get('visible') && !column.get('resizable')) {
                            width -= column.get("el").outerWidth();
                        }
                    });

                    var colWidth = width / adjustCount;

                    S.each(columns, function (column) {
                        if (column.get('visible') && column.get('resizable')) {
                            var columnEl = column.get("el");
                            var borderWidth =
                                parseInt(columnEl.css("border-left-width")) || 0 +
                                    parseInt(columnEl.css("border-right-width")) || 0;
                            // ！ note
                            //
                            // 会再调用 setTableWidth， 循环调用
                            column.set("width", colWidth - borderWidth, {
                                silent:1
                            });
                            columnEl.width(colWidth - borderWidth);
                        }
                    });

                    _self.fire('forceFitWidth');
                }

            }