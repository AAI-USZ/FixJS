function (acc, row, idx) {
                    var slice = fixed ? row.slice(0, fixed_length) : row.slice(fixed_length),
                        abs_row = idx + meta.viewport.abs_rows[0], first = fixed && idx === 0;
                    acc.rows.push({
                        top: abs_row * row_height,
                        cells: slice.reduce(function (acc, val, idx) {
                            var column = meta.viewport.cols[fixed ? idx : fixed_length + idx];
                            return acc.concat({column: column, value: format(grid, val, meta.columns.types[column])});
                        }, [])
                    });
                    return acc;
                }, {holder_height: meta.viewport.height + (fixed ? scrollbar_size : 0), rows: []}