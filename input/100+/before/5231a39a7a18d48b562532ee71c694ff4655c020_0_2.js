function(contentData) {

            var managersList = '';
            var viewersList = '';
            if (contentData['sakai:pooled-content-manager']) {
                for (var i = 0; i < contentData['sakai:pooled-content-manager'].length; i++) {
                    if (contentData['sakai:pooled-content-manager'][i]) {
                        managersList += ' ' + (contentData['sakai:pooled-content-manager'][i]);
                    }
                }
            }
            if (contentData['sakai:pooled-content-viewer']) {
                for (var z = 0; z < contentData['sakai:pooled-content-viewer'].length; z++) {
                    if (contentData['sakai:pooled-content-viewer'][z]) {
                        viewersList += ' ' + (contentData['sakai:pooled-content-viewer'][z]);
                    }
                }
            }

            var searchterm = contentData['sakai:pooled-content-file-name'].substring(0,400) + ' ' + managersList + ' ' + viewersList;
            var searchquery = prepSearchTermForURL(searchterm);

            // get related content for contentData
            // return some search results for now
            var params = {
                'items' : '2'
            };
            var url = sakai.config.URL.SEARCH_ALL_FILES.replace('.json', '.infinity.json');
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