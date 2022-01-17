function (table, opts) {
            var ret = new comb.Promise();
            var quotedTable = this.__quoteSchemaTable(table), pks = this.__primaryKeys;
            if (pks.hasOwnProperty(quotedTable.toString())) {
                ret.callback(pks[quotedTable.toString()]);
            } else {
                this.__primarykey(table).then(function (res) {
                    pks[quotedTable] = res;
                    ret.callback(res);
                }, ret);
            }
            return ret;
        }