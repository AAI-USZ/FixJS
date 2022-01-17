function(i, contentItem){
                if (contentItem['sakai:pooled-content-file-name']) {
                    contentItem.id = contentItem["_path"];
                    contentItem.link = "/content#p=" + sakai_util.safeURL(contentItem["_path"]);
                    contentItem.canDelete = sakai_content.isContentInLibrary(contentItem, meData.user.userid) || (sakai_content.Collections.isCollection(contentItem) && sakai_content.Collections.isCollectionInMyLibrary(contentItem));
                    contentItem.numPlaces = sakai_content.getPlaceCount(contentItem);
                    contentItem.numComments = sakai_content.getCommentCount(contentItem);
                    // Only modify the description if there is one
                    if (contentItem["sakai:description"]) {
                        contentItem["sakai:description-shorter"] = sakai_util.applyThreeDots(contentItem["sakai:description"], 150, {
                            max_rows: 2,
                            whole_word: false
                        }, "");
                        contentItem["sakai:description-long"] = sakai_util.applyThreeDots(contentItem["sakai:description"], 1200, {
                            max_rows: 2,
                            whole_word: false
                        }, "");
                        contentItem["sakai:description"] = sakai_util.applyThreeDots(contentItem["sakai:description"], 580, {
                            max_rows: 2,
                            whole_word: false
                        }, "");
                    }
                    if (contentItem["sakai:pooled-content-file-name"]) {
                        contentItem["sakai:pooled-content-file-name-short"] = sakai_util.applyThreeDots(contentItem["sakai:pooled-content-file-name"], 560, {
                            max_rows: 1,
                            whole_word: false
                        }, "s3d-bold");
                        contentItem["sakai:pooled-content-file-name-shorter"] = sakai_util.applyThreeDots(contentItem["sakai:pooled-content-file-name"], 150, {
                            max_rows: 1,
                            whole_word: false
                        }, "s3d-bold");
                    }
                    // Modify the tags if there are any
                    if (contentItem["sakai:tags"]) {
                        if ( _.isString(contentItem["sakai:tags"]) ) {
                            contentItem["sakai:tags"] = contentItem["sakai:tags"].split(",");
                        }
                        contentItem.tagsProcessed = sakai_util.formatTags(contentItem["sakai:tags"]);
                    }
                    // set mimetype
                    var mimeType = sakai_content.getMimeType(contentItem);
                    var mimeTypeData = sakai_content.getMimeTypeData(mimeType);
                    contentItem.mimeType = mimeType;
                    contentItem.mimeTypeURL = mimeTypeData.URL;
                    contentItem.mimeTypeDescription = sakai_i18n.getValueForKey(mimeTypeData.description);
                    contentItem.thumbnail = sakai_content.getThumbnail(results[i]);
                    // if the content has an owner we need to add their ID to an array,
                    // so we can lookup the users display name in a batch req
                    if (contentItem['sakai:pool-content-created-for'] && !results.fetchMultipleUserDataInWidget) {
                        userArray.push(contentItem["sakai:pool-content-created-for"]);
                    }
                    contentItem.hasPreview = sakai_content.hasPreview(contentItem);
                }
            }