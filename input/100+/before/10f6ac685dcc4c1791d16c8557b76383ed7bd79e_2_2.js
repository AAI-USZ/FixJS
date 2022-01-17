function() {
            content_path = $.bbq.getState("p") || "";
            content_path = content_path.split("/");
            content_path = "/p/" + content_path[0];

            if (content_path != previous_content_path) {
                previous_content_path = content_path;
                globalPageStructure = false;
                loadContentProfile(function(){
                    // The request was successful so initialise the entity widget
                    if (sakai_global.entity && sakai_global.entity.isReady) {
                        $(window).trigger("render.entity.sakai", ["content", sakai_global.content_profile.content_data]);
                    }
                    else {
                        $(window).bind("ready.entity.sakai", function(e){
                            $(window).trigger("render.entity.sakai", ["content", sakai_global.content_profile.content_data]);
                            ready_event_fired++;
                        });
                    }
                    // The request was successful so initialise the relatedcontent widget
                    if (sakai_global.relatedcontent && sakai_global.relatedcontent.isReady) {
                        $(window).trigger("render.relatedcontent.sakai", sakai_global.content_profile.content_data);
                    }
                    else {
                        $(window).bind("ready.relatedcontent.sakai", function(e){
                            $(window).trigger("render.relatedcontent.sakai", sakai_global.content_profile.content_data);
                            ready_event_fired++;
                        });
                    }
                    // The request was successful so initialise the relatedcontent widget
                    if (sakai_global.contentpreview && sakai_global.contentpreview.isReady) {
                        if (showPreview) {
                            $(window).trigger("start.contentpreview.sakai", sakai_global.content_profile.content_data);
                        }
                    }
                    else {
                        $(window).bind("ready.contentpreview.sakai", function(e){
                            if (showPreview) {
                                $(window).trigger("start.contentpreview.sakai", sakai_global.content_profile.content_data);
                                ready_event_fired++;
                            }
                        });
                    }
                    // The request was successful so initialise the metadata widget
                    if (sakai_global.contentmetadata && sakai_global.contentmetadata.isReady) {
                        $(window).trigger("render.contentmetadata.sakai");
                    }
                    else {
                        $(window).bind("ready.contentmetadata.sakai", function(e){
                            $(window).trigger("render.contentmetadata.sakai");
                            ready_event_fired++;
                        });
                    }                   
                    sakai.api.Security.showPage();
                    document.title = sakai.api.i18n.getValueForKey(sakai.config.PageTitles.prefix) + " " + sakai_global.content_profile.content_data.data["sakai:pooled-content-file-name"];

                    // rerender comments widget
                    $(window).trigger("content_profile_hash_change");
                });
            }
            showPreview = true;
        }