function (acc, val, idx) {
                            var column = meta.viewport.cols[fixed ? idx : fixed_length + idx],
                                first = fixed && idx === 0, value = format(grid, val, meta.columns.types[column]);
                            return acc.concat({column: column, value: first ? indent(grid, abs_row, value) : value});
                        }