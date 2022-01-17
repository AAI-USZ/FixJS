function(data){
                collectionviewer.listStyle = $.bbq.getState(collectionviewer.tuidls) || 'list';
                $('#collectionviewer_add_content_button > div', $rootel).text(data.total);
                collectionviewer.total = data.total;
                collectionData[pageNumber] = data.results;
                renderGridOrList(false, true);
                sakai.api.Util.progressIndicator.hideProgressIndicator();
            }