function() {
            var result = [];

            joli.each(this._options.table.getColumns(), function(colType, colName) {
                result[colName] = this._data[colName];
            }, this);
            return result;
        }