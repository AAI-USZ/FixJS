function(contentData){
            var searchterm = contentData["sakai:pooled-content-file-name"].substring(0,400);
            searchquery = sakai.api.Server.createSearchString(searchterm, false, 'OR');

            // get related content for contentData
            // return some search results for now
            var params = {
                'items' : '2'
            };
            var url = sakai.config.URL.SEARCH_ALL_FILES.replace('.json', '.0.json');
            if (searchquery === '*' || searchquery === '**') {
                url = sakai.config.URL.SEARCH_ALL_FILES_ALL;
            } else {
                params['q'] = searchquery;
            }
            $.ajax({
                url: url,
                data: params,
                success: function(relatedContent) {
                    var recentchangedcontentjson = {items: []};
                    var item = parseDataResult(contentData);
                    var isRelatedContent = false;
                    for (var i = 0; i < relatedContent.results.length; i++) {
                        if (relatedContent.results[i]['_path'] !== contentData['_path']) {
                            isRelatedContent = relatedContent.results[i];
                            break;
                        }
                    }
                    if(isRelatedContent) {
                        item.relatedContent = parseDataResult(isRelatedContent, true);
                    }
                    recentchangedcontentjson.items.push(item);
                    // pass the array to HTML view
                    recentchangedcontentjson.sakai = sakai;
                    sakai.api.Util.TemplateRenderer(recentchangedcontentItemTemplate, recentchangedcontentjson, $(recentchangedcontentItem, rootel));
                }
            });
            
        }