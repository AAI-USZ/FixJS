function(tuid,showSettings){

        var $rootel = $("#" + tuid);
        var obj = {};
        obj.type = "showpreview";
        var contentData = {};

        var qs = new Querystring();

        var determineDataType = function(){
            hidePreview();
            obj.type = "showpreview";
            obj.buttons = "default";
            var callback = null;
            var user = contentData.data["_bodyLastModifiedBy"];
            if (user === "admin") {
                user = contentData.data["sakai:pool-content-created-for"];
            } else if (!user) {
                user = contentData.data["_lastModifiedBy"];
            }
            sakai.api.User.getUser(user, function(success, userdata){
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
                if (sakai_global && sakai_global.content_profile && (sakai_global.content_profile.content_data.data.mimeType !== 'x-sakai/collection' &&
                    sakai_global.content_profile.content_data.data.mimeType !== 'x-sakai/document')) {
                    $(".collectionviewer_widget .collectionviewer_collection_item_preview").remove();
                }
                sakai.api.Util.TemplateRenderer("contentpreview_widget_main_template", obj, $("#contentpreview_widget_main_container", $rootel));
                if (callback) {
                    callback();
                }
            });
        };

        var renderFullSizePreview = function(){
            var fullSizeContainer = $("#contentpreview_fullsize_preview", $rootel);
            var tuid = sakai.api.Util.generateWidgetId();
            var data = {};
            data[tuid] = contentData;
            sakai.api.Util.TemplateRenderer($("#contentpreview_fullsize_template", $rootel), {tuid: tuid}, fullSizeContainer);
            sakai.api.Widgets.widgetLoader.insertWidgets(fullSizeContainer, false, false, [data]);
        };

        var hidePreview = function(){
            $("#contentpreview_widget_main_container", $rootel).html("");
            $("#contentpreview_image_preview", $rootel).html("");
        };

        if (!$rootel.parents(".collectionviewer_collection_item_preview").length){
            $(window).bind("start.contentpreview.sakai", function(ev, data){
                contentData = data;
                determineDataType();
            });

            $(window).bind("updated.version.content.sakai",function() {
                determineDataType();
            });

            // Indicate that the widget has finished loading
            sakai_global.contentpreview.isReady = true;
            $(window).trigger("ready.contentpreview.sakai", {});
        } else {
            $rootel.parents('.collectionviewer_widget').bind('start.collectioncontentpreview.sakai', function(ev, data) {
                contentData = {data: data};
                determineDataType();
            });

            // Indicate that the widget has finished loading
            sakai_global.contentpreview.isReady = true;
            $rootel.parents('.collectionviewer_widget').trigger('ready.collectioncontentpreview.sakai');
        }
    }