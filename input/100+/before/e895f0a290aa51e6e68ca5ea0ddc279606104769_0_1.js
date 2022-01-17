function () {
                if (!viewport) return;
                var viewports = api[grid_type].viewports;
                subs.data = true;
                (viewport_id ? viewports.get({
                    view_id: view_id, viewport_id: viewport_id, update: data_setup
                }) : viewports.put({view_id: view_id, rows: viewport.rows, columns: viewport.cols})
                    .pipe(function (result) {
                        return viewports
                            .get({view_id: view_id, viewport_id: viewport_id = result.meta.id, update: data_setup});
                    })
                ).pipe(data_handler);
            }