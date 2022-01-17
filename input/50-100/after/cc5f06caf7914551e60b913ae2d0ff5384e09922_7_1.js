function (page, pageSize, sortField, sortDirection, searchQuery) {
        var deferred = new $.Deferred();
        if (app.isPrerendering('projects')) {
            deferred.resolve(app.prerenderedView.data);
        } else {
            var params = {};
            //            if (page) {
            //                params['page'] = page;
            //            }
            //            if (pageSize) {
            //                params['pageSize'] = pageSize;
            //            }
            //            if (sortField) {
            //                params['sortField'] = sortField;
            //            }
            //            if (sortDirection) {
            //                params['sortDirection'] = sortDirection;
            //            }
            //            if (searchQuery) {
            //                params['searchQuery'] = searchQuery;
            //            }
            $.ajax({
                url: '/projects',
                data: params
            }).done(function (data) {
                deferred.resolve(data.Model);
            });
        }
        return deferred.promise();
    }