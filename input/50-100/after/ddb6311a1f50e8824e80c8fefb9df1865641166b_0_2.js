function() {
            var me = this;
            //if (me.__dataSeries) return me.__dataSeries;
            me.__dataSeries = [];
            me.__dataview.eachColumn(function(name, col, i) {
                if (i > 0 || !me.hasRowHeader()) {
                    me.__dataSeries.push(col);
                }
            });
            return me.__dataSeries;
        }