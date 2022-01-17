function(id){
            if($("#savecontent_select option:selected", $rootel).data("redirect") !== true){
                $savecontent_save.attr("disabled", "disabled");
                $.each(contentObj.data, function(i, content){
                    if (sakai.api.Content.Collections.isCollection(content.body)){
                        sakai.api.Content.Collections.shareCollection(content.body["_path"], id, false, function(){
                            finishSaveContent(content.body["_path"], id);
                        });
                    } else {
                        sakai.api.Content.addToLibrary(content.body["_path"], id, false, finishSaveContent);
                    }
                });
                $(window).trigger("done.newaddcontent.sakai");
                var notificationBody = false;
                var notificationTitle = false;
                if (sakai.api.Content.Collections.isCollection(id)){
                    notificationBody = decodeURIComponent($("#savecontent_collection_add_library_body").html());
                    notificationBody = notificationBody.replace("${collectionid}", sakai.api.Security.safeOutput(sakai.api.Content.Collections.getCollectionPoolId(id)));
                    notificationBody = notificationBody.replace("${collectiontitle}", sakai.api.Security.safeOutput($("#savecontent_select option:selected", $rootel).text()));
                    notificationTitle = $("#savecontent_collection_add_library_title").html();
                } else if (id === sakai.data.me.user.userid) {
                    notificationBody = decodeURIComponent($('#savecontent_my_add_library_body').html());
                    notificationTitle = $('#savecontent_group_add_library_title').html();
                } else {
                    notificationBody = decodeURIComponent($("#savecontent_group_add_library_body").html());
                    notificationBody = notificationBody.replace("${groupid}", sakai.api.Security.safeOutput(id));
                    notificationBody = notificationBody.replace("${grouplibrary}", sakai.api.Security.safeOutput($("#savecontent_select option:selected", $rootel).text()));
                    notificationTitle = $("#savecontent_group_add_library_title").html();
                }
                sakai.api.Util.notification.show(notificationTitle, notificationBody);
                hideSavecontent();
            } else {
                document.location = "/create#l=" + $("#savecontent_select", $rootel).val() + "&contentToAdd=" + getFileIDs().toString();
            }
        }