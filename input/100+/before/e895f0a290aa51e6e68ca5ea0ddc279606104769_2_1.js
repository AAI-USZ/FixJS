function (grid, config) {
            grid.alive = function () {return grid.$(grid.id).length ? true : !grid.elements.style.remove();};
            grid.elements = {empty: true};
            grid.id = '#analytics_grid_' + counter++;
            grid.meta = null;
            grid.resize = set_size.partial(grid, config);
            (grid.dataman = new og.analytics.Data(config.source))
                .on('meta', init_grid, grid, config)
                .on('data', render_rows, grid);
            grid.events = {mousedown: [], scroll: [], render: []};
            grid.on = function (type, handler) {
                if (type in grid.events)
                    grid.events[type].push({handler: handler, args: Array.prototype.slice.call(arguments, 2)});
                return grid;
            };
            grid.formatter = new og.analytics.Formatter(grid);
        }