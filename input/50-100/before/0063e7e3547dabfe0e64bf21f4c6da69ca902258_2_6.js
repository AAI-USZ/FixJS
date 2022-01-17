function(data){
                collectionviewer.listStyle = $.bbq.getState("ls") || "list";
                $("#collectionviewer_add_content_button > div").text(data.total);
                collectionviewer.total = data.total;
                collectionData[pageNumber] = data.results;
                renderGridOrList(false, true);
                sakai.api.Util.progressIndicator.hideProgressIndicator();
            }