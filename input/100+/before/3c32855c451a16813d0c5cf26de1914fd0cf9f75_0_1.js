function(index, item){
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
                }