function($container, q, pagenum) {
            pagenum = pagenum || 1;
            var searchURL = '';
            var sortOrder = $(newaddcontentExistingItemsListContainerActionsSort + ' option:selected').attr('data-sort-order');
            var sortOn = $(newaddcontentExistingItemsListContainerActionsSort + ' option:selected').attr('data-sort-on');
            switch(currentExistingContext) {
                case 'everything':
                    if (!q || (q === '*')) {
                        searchURL = '/var/search/pool/all-all.infinity.json?items=10&page=' + (pagenum - 1) + '&sortOrder=' + sortOrder + '&sortOn=' + sortOn;
                    } else {
                        searchURL = '/var/search/pool/all.infinity.json?items=10&page=' + (pagenum - 1) + '&sortOrder=' + sortOrder + '&sortOn=' + sortOn + '&q=' + q;
                    }
                    break;
                case 'my_library':
                    searchURL = sakai.config.URL.POOLED_CONTENT_SPECIFIC_USER + '?userid=' + sakai.data.me.user.userid + '&items=10&page=' + (pagenum - 1) + '&sortOrder=' + sortOrder + '&sortOn=' + sortOn + '&q=' + q;
                    break;
            }
            uncheckCheckboxes();
            $.ajax({
                url: searchURL,
                type: 'GET',
                success: function(data) {
                    var existingIDs = [];
                    $.each(itemsToUpload, function(index, item) {
                        if(item.type === 'existing') {
                            existingIDs.push(item['_path']);
                        }
                    });
                    if (data && data.results) {
                        existingItems = data.results;
                    }
                    $container.html(sakai.api.Util.TemplateRenderer(newaddcontentExistingItemsTemplate, {'data': data, 'query':q, 'sakai':sakai, 'queue':existingIDs, 'context':currentExistingContext}));
                    // Disable the add button
                    disableAddToQueue();
                    var numberOfPages = Math.ceil(data.total / 10);
                    $('#newaddcontent_existingitems_paging').pager({
                        pagenumber: pagenum,
                        pagecount: numberOfPages,
                        buttonClickCallback: searchPaging
                    });
                    if (numberOfPages > 1) {
                        $('#newaddcontent_existingitems_paging').show();
                    } else {
                        $('#newaddcontent_existingitems_paging').hide();
                    }
                },
                error: function(err) {

                }
            });
        }