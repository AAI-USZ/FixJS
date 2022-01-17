function (column) {
                        if (column.get('visible') && column.get('resizable')) {
                            adjustCount++;
                        }
                        if (column.get('visible') && !column.get('resizable')) {
                            width -= column.get("el").outerWidth();
                        }
                    }