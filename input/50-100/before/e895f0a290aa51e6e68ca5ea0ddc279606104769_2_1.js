function (acc, val, idx) {
                            var column = meta.viewport.cols[fixed ? idx : fixed_length + idx];
                            return acc.concat({column: column, value: format(grid, val, meta.columns.types[column])});
                        }