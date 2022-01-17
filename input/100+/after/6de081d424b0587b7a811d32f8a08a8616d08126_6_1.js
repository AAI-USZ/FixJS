function() {
            var managersList = "";
            var viewersList = "";
            var ajaxSuccess = function(data) {
                var itemsDisplayed = data.items * (page + 1);
                var moreResults = itemsDisplayed < data.total;
                $.each(data.results, function(index, item){
                    data.results[index].commentcount = sakai.api.Content.getCommentCount(item);
                    var mimeType = sakai.api.Content.getMimeType(data.results[index]);
                    var mimeTypeDescription = sakai.api.i18n.getValueForKey(sakai.config.MimeTypes["other"].description);
                    if (sakai.config.MimeTypes[mimeType]){
                        mimeTypeDescription = sakai.api.i18n.getValueForKey(sakai.config.MimeTypes[mimeType].description);
                    }
                    data.results[index].mimeTypeDescription = mimeTypeDescription;
                });
                var json = {
                    "content": contentData,
                    "relatedContent": data
                };
                renderTemplate(json);
                if (!moreResults) {
                    $(relatedcontentShowMore).hide();
                    $('#relatedcontent_footer').addClass('relatedcontent_footer_norelated');
                } else {
                    $(relatedcontentShowMore).show();
                    $('#relatedcontent_footer').removeClass('relatedcontent_footer_norelated');
                }
            };
            var ajaxError = function() {
                renderTemplate({});
            };

            for (var i = 0; i < contentData.members.managers.length; i++) {
                if (contentData.members.managers[i]) {
                    managersList += " " + (contentData.members.managers[i]["rep:userId"] || contentData.members.managers[i]["sakai:group-id"]);
                }
            }
            for (var j = 0; j < contentData.members.viewers.length; j++) {
                if (contentData.members.viewers[j]) {
                    viewersList += " " + (contentData.members.viewers[j]["rep:userId"] || contentData.members.viewers[j]["sakai:group-id"]);
                }
            }
            var searchterm = contentData.data["sakai:pooled-content-file-name"].substring(0,400) + " " + managersList + " " + viewersList;
            if (contentData.data['sakai:tags'] && contentData.data['sakai:tags'].length) {
                searchterm = searchterm + ' ' + contentData.data['sakai:tags'].join(' ');
            }
            var searchquery = sakai.api.Server.createSearchString(searchterm, false, 'OR');

            // get related content for contentData
            // return some search results for now
            var params = {
                'items': numberofitems,
                'page': page
            };
            var url = sakai.config.URL.SEARCH_ALL_FILES.replace('.json', '.0.json');
            if (searchquery === '*' || searchquery === '**') {
                url = sakai.config.URL.SEARCH_ALL_FILES_ALL;
            } else {
                params["q"] = searchquery;
            }
            $.ajax({
                url: url,
                data: params,
                success: ajaxSuccess,
                error: ajaxError
            });
            
        }