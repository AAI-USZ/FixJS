function(name, col, i) {
                if (i > 0 || !me.hasRowHeader()) {
                    me.__dataSeries.push(col);
                }
            }