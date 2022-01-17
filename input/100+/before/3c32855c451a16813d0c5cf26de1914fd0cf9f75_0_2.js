function(data) {
                var moreResults = false;
                $.each(data.results, function(index, item){
                    if(checkMoreRelated){
                        moreResults = true;
                    }
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
                if(!checkMoreRelated){
                    renderTemplate(json);
                } else {
                    if (!moreResults){
                        $(relatedcontentShowMore).hide();
                        $("#relatedcontent_footer").addClass("relatedcontent_footer_norelated");
                    } else {
                        $(relatedcontentShowMore).show();
                        $("#relatedcontent_footer").removeClass("relatedcontent_footer_norelated");
                    }
                }
            }