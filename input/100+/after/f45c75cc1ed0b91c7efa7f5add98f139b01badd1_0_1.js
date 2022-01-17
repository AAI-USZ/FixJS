function (type) {
            var from = this.__opts.from.slice(1), join = this.__opts.join, ret = "";
            if (!from.length) {
                if (!comb.isEmpty(join)) {
                    throw new QueryError("Need multiple FROM tables if updating/deleteing a dataset with joins");
                }
            } else {
                var space = this._static.SPACE;
                ret = [space, type.toString(), space, this._sourceList(from), this._selectJoinSql()].join("");
            }
            return ret;
        }