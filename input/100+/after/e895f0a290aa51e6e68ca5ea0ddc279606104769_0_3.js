function (config) {
            var data = this, events = {meta: [], data: []}, id = 'data_' + counter++, meta, cols,
                viewport = null, view_id = config.view, viewport_id, subscribed = false,
                ROOT = 'rootNode', SETS = 'columnSets', ROWS = 'rowCount',
                grid_type = config.type, depgraph = !!config.depgraph,
                fixed_set = {portfolio: 'Portfolio', primitives: 'Primitives'};
            var data_handler = function (result) {
                if (!events.data.length) return; // if a tree falls, etc.
                if (result.error) return og.dev.warn(result.message);
                fire('data', result.data);
            };
            var data_setup = function () {
                if (!viewport) return;
                var viewports = api[grid_type].viewports;
                subscribed = true;
                (viewport_id ? viewports.get({
                    view_id: view_id, viewport_id: viewport_id, update: data_setup
                }) : viewports.put({view_id: view_id, rows: viewport.rows, columns: viewport.cols})
                    .pipe(function (result) {
                        return viewports
                            .get({view_id: view_id, viewport_id: viewport_id = result.meta.id, update: data_setup});
                    })
                ).pipe(data_handler);
            };
            var fire = function (type) {
                var args = Array.prototype.slice.call(arguments, 1);
                events[type].forEach(function (value) {value.handler.apply(null, value.args.concat(args));});
            };
            var grid_handler = function (result) {
                if (result.error)
                    return (view_id = viewport_id = subscribed = null), og.dev.warn(result.message), initialize();
                if (!result.data[SETS].length) return;
                meta.rows = result.data[ROOT] ? result.data[ROOT][1] + 1 : result.data[ROWS];
                meta.columns.fixed = [{
                    name: fixed_set[grid_type], columns: result.data[SETS][0].columns
                        .map(function (col) {return (col.width = 150), col;})
                }];
                meta.columns.scroll = result.data[SETS].slice(1).map(function (set) {
                    return set.columns.forEach(function (col) {return (col.width = 175), col;}), set;
                });
                fire('meta', meta);
                if (!subscribed) return data_setup();
            };
            var grid_setup = function (result) {
                return api[grid_type].grid.get({id: view_id, update: initialize});
            };
            var initialize = function () {
                (view_id ? grid_setup() : api.put(config).pipe(view_handler)).pipe(grid_handler);
            };
            var view_handler = function (result) {return (view_id = result.meta.id), grid_setup();};
            data.busy = (function (busy) {
                return function (value) {return busy = typeof value !== 'undefined' ? value : busy;};
            })(false);
            data.id = id;
            data.meta = meta = {columns: {}};
            data.cols = cols = {};
            data.on = function (type, handler) {
                if (type in events)
                    events[type].push({handler: handler, args: Array.prototype.slice.call(arguments, 2)});
                return data;
            };
            data.viewport = function (new_viewport) {
                var viewports = api[grid_type].viewports;
                viewport = new_viewport;
                if (viewport.rows === 'all') viewport.rows = [0, meta.rows];
                if (!viewport_id) return;
                data.busy(true);
                viewports
                    .put({view_id: view_id, viewport_id: viewport_id, rows: viewport.rows, columns: viewport.cols})
                    .pipe(function (result) {data.busy(false);})
            };
            initialize();
        }