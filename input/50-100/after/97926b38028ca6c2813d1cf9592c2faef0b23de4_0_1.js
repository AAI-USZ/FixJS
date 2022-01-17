function (value, metaData, record, rowIndex, colIndex, store) {
                    metaData.css += ' x-grid3-check-col-td';
                    if(!value || value == "0") {
                        value = false;
                    }
                    return String.format('<div class="x-grid3-check-col{0}" style="background-position:10px center;">&#160;</div>', value ? '-on' : '');
                }