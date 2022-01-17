function(grid, editMode){
            if (sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)) {
                if (editMode) {
                    $("#collectionviewer_edit_collection_button").hide();
                    $("#collectionviewer_finish_editing_collection_button").show();
                } else {
                    $("#collectionviewer_finish_editing_collection_button").hide();
                    $("#collectionviewer_edit_collection_button").show();
                }
            }
            var pageNumber = collectionviewer.page - 1;
            sakai.api.Util.TemplateRenderer("collectionviewer_grid_or_list_template", {
                items: collectionData[pageNumber],
                sakai: sakai,
                grid: grid,
                editMode: editMode,
                collectionName: getCollectionName(),
                collectionId: sakai.api.Content.Collections.getCollectionPoolId(collectionviewer.contextId),
                isManager: sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)
            }, $collectionviewerGridListContainer);
            $collectionviewerGridListContainer.show();
            var pageCount = Math.ceil(collectionviewer.total / 12);
            if (pageCount > 1){
                $("#collectionviewer_paging", $rootel).show();
                $("#collectionviewer_paging", $rootel).pager({
                    pagenumber: parseInt(collectionviewer.page, 10),
                    pagecount: Math.ceil(collectionviewer.total / 12),
                    buttonClickCallback: function(page){
                        fetchCollectionData = false;
                        collectionviewer.page = parseInt(page, 10);
                        $.bbq.pushState({"lp": collectionviewer.page});
                        decideGetNextBatch();
                    }
                });
            } else {
                $("#collectionviewer_paging", $rootel).hide();
            }
        }