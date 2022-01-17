function (result) {
                if (result.error) return og.dev.warn(result.message); else if (!result.data[SETS].length) return;
                meta.rows = result.data[ROOT] ? result.data[ROOT][1] + 1 : result.data[ROWS];
                meta.columns.fixed = [{
                    name: fixed_set[grid_type], columns: result.data[SETS][0].columns
                        .map(function (col) {return (col.width = 150), col;})
                }];
                meta.columns.scroll = result.data[SETS].slice(1).map(function (set) {
                    return set.columns.forEach(function (col) {return (col.width = 175), col;}), set;
                });
                fire('meta', meta);
                if (!subs.data) return data_setup();
            }