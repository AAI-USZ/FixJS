function(userid, refresh, callback){
            toggleButtons(collectionviewer.listStyle);
            if(refresh){
                collectionviewer.page = $.bbq.getState("lp") || 1;
                collectionData = [];
            }
            var data = {
                sortOn: "filename",
                sortOrder: collectionviewer.sortOrder,
                userid: userid || widgetData.collectionviewer.groupid,
                items: 15,
                page: (collectionviewer.page - 1)
            };
            if(collectionviewer.sortOrder === "modified"){
                data.sortOrder = "desc";
                data.sortOn = "_lastModified";
            }
            if (collectionviewer.listStyle === "carousel") {
                data.items = 1000;
                data.page = 0;
            }
            $.ajax({
                url: sakai.config.URL.POOLED_CONTENT_SPECIFIC_USER,
                data: data,
                success: function(data){
                    if($.isFunction(callback)){
                        sakai.api.Content.prepareContentForRender(data.results, sakai.data.me, function(parsedContent){
                            callback(data);
                        });
                    } else {
                        $("#collectionviewer_add_content_button > div", $rootel).text(data.total);
                        collectionviewer.total = data.total;
                        if(data.results && data.results.length){
                            sakai.api.Content.prepareContentForRender(data.results, sakai.data.me, function(parsedContent){
                                collectionData[(collectionviewer.page - 1)] = parsedContent;
                                // Get the full profiles for these items
                                showData();
                            });
                        } else {
                            showData();
                        }
                    }
                }
            });
        }