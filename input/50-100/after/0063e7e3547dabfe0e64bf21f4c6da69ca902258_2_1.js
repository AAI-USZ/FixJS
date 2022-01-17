function(data){
                    selectedData.collectionItems = data.results;
                    sakai.api.Util.TemplateRenderer("collectionviewer_list_item_template", {
                        data: selectedData,
                        sakai: sakai,
                        collectionName: getCollectionName(),
                        collectionId: getCollectionId(collectionviewer.contextId),
                        isManager: sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)
                    }, $("#collectionviewer_expanded_content_container", $rootel));
                    sakai.api.Widgets.widgetLoader.insertWidgets(tuid);
                }