function(i, dataItem){
                // results for poolid.infinity.json
                if(dataItem.url.indexOf(".infinity.json") > -1){

                    // Stores all general data on tempItem.data
                    contentItem = {};
                    contentItem.data = $.parseJSON(dataItem.body);
                    if (sakai_content.Collections.isCollection(contentItem.data)){
                        collectionGroup = true;
                    }

                } else if(dataItem.url.indexOf(".members.json") > -1){

                    // If this content item is a collection, retrieve the list of members
                    // behind the pseudoGroup
                    if (!collectionGroup){
                        parseMembers($.parseJSON(dataItem.body), contentItem);
                    }

                } else if(dataItem.url.indexOf(".versions.json") > -1){

                    // results for versions.json
                    // Parses all information related to versions and stores them on tempItem
                    var versionInfo =$.parseJSON(dataItem.body);
                    var versions = [];
                    for (var j in versionInfo.versions) {
                        if(versionInfo.versions.hasOwnProperty(j)){
                            var splitDate = versionInfo.versions[j]["_created"];
                            versionInfo.versions[j]["_created"] = sakai_l10n.transformDate(new Date(splitDate));
                            versions.push(versionInfo.versions[j]);
                        }
                    }
                    versionInfo.versions = versions.reverse();
                    // Add the versions to the tempItem object
                    contentItem.versions = versionInfo;

                }else if (dataItem.url.indexOf("activityfeed.json") > -1){

                    // results for activity.json
                    contentItem.activity = $.parseJSON(dataItem.body);

                    // Add in some extra data on the object about the content
                    // Is current user manager/viewer
                    contentItem.isManager = sakai_content.isUserAManager(contentItem.data, sakai_user.data.me);
                    contentItem.isViewer = sakai_content.isUserAViewer(contentItem.data, sakai_user.data.me);

                    // Set the mimetype of the content
                    var mimeType = sakai_content.getMimeType(contentItem.data);
                    contentItem.data.mimeType = mimeType;
                    if (sakai_conf.MimeTypes[mimeType]) {
                        contentItem.data.iconURL = sakai_conf.MimeTypes[mimeType].URL;
                    } else {
                        contentItem.data.iconURL = sakai_conf.MimeTypes["other"].URL;
                    }

                    // Add paths to the content item
                    contentItem.content_path = "/p/" + contentItem.data._path;
                    contentItem.smallPath = "/p/" + contentItem.data._path;
                    contentItem.url = sakai_conf.SakaiDomain + "/p/" + contentItem.data._path + "/" + sakai_util.safeURL(contentItem.data["sakai:pooled-content-file-name"]);
                    contentItem.path = "/p/" + contentItem.data._path + "/" + sakai_util.safeURL(contentItem.data["sakai:pooled-content-file-name"]);

                }
            }