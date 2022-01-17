function(success, data){
                if(success && data.safeToEdit){
                    var toStore = {};
                    toStore[currentPageShown.saveRef] = {
                        page: page
                    };
                    $.ajax({
                        url: currentPageShown.pageSavePath,
                        type: "POST",
                        dataType: "json",
                        data: {
                            ":operation": "import",
                            ":contentType": "json",
                            ":replace": true,
                            ":replaceProperties": true,
                            "_charset_":"utf-8",
                            ":content": $.toJSON(toStore)
                        },
                        success: function(){
                            $.ajax({
                                url: currentPageShown.pageSavePath + "/" + currentPageShown.saveRef + ".save.json",
                                type: "POST",
                                data: {
                                    "sling:resourceType": "sakai/pagecontent",
                                    "sakai:pagecontent": $.toJSON(toStore),
                                    "_charset_": "utf-8"
                                }, success: function(){
                                    $(window).trigger("update.versions.sakai", currentPageShown);
                                }
                            });
                        }
                    });
                } else {
                    sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey("RESTORE_VERSION", "versions"), sakai.api.i18n.getValueForKey("NEW_VERSION_COULD_NOT_BE_STORED", "versions"));
                }
            }