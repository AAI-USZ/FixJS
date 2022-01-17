function (column) {
                        if (!column.get('hide') && column.get('resizable')) {
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
                    }