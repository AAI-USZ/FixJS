function(success, userdata){
                var mimeType = sakai.api.Content.getMimeType(contentData.data);
                obj.userName = sakai.api.User.getDisplayName(userdata);
                if (qs.get("nopreview") === "true"){
                    callback = renderDefaultPreview;
                    obj.type = "default";
                } else if (mimeType === "x-sakai/link"){
                    obj.buttons = "links";
                }
                if (sakai.api.Content.hasPreview(contentData.data)) {
                    callback = renderFullSizePreview;
                } else {
                    obj.type = "default";
                }
                obj.sakai = sakai;
                obj.contentData = contentData;
                if(sakai_global.content_profile.content_data.data.mimeType !== "x-sakai/collection"){
                    $(".collectionviewer_widget .collectionviewer_collection_item_preview").remove();
                }
                sakai.api.Util.TemplateRenderer("contentpreview_widget_main_template", obj, $("#contentpreview_widget_main_container", $rootel));
                if (callback) {
                    callback();
                }
            }