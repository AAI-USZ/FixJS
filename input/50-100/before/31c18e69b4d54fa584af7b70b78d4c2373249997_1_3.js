function (column) {
                        if (!column.get('hide') && column.get('resizable')) {
                            adjustCount++;
                        }
                        if (!column.get('hide') && !column.get('resizable')) {
                            width -= column.get("el").outerWidth();
                        }
                    }