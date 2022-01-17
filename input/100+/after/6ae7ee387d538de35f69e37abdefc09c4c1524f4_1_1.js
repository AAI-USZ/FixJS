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

                }
            }