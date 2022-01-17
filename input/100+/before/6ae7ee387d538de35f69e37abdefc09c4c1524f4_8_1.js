function(event){
            event.stopPropagation();
            if (!sakai_global.content_profile || sakai_global.content_profile.content_data.data.mimeType == "x-sakai/document") {
                $(".versions_selected", $rootel).removeClass("versions_selected");
                $(this).addClass("versions_selected");
                if (!$("#" + currentPageShown.ref + "_previewversion").length) {
                    $("#" + currentPageShown.ref).before("<div id=\"" + currentPageShown.ref + "_previewversion\"></div>");
                }
                if(sakai.api.Util.determineEmptyContent(versions[$(this).attr("data-versionId")].page)) {
                    $("#" + currentPageShown.ref + "_previewversion").html("<div>" + versions[$(this).attr("data-versionId")].page + "</div>");
                } else {
                    $("#" + currentPageShown.ref + "_previewversion").html(sakai.api.Util.TemplateRenderer("versions_empty_document_template", {
                        "currentversion": $(this).attr("data-versionId") === versions.length - 1
                    }));
                }
                $("#" + currentPageShown.ref).remove();
                $("#" + currentPageShown.ref + "_previewversion").show();
                sakai.api.Widgets.widgetLoader.insertWidgets(currentPageShown.ref + "_previewversion", false, currentPageShown.pageSavePath + "/");
                sakai.api.Util.renderMath(currentPageShown.ref + "_previewversion");
            } else{
                window.open(currentPageShown.pageSavePath + ".version.," + $(this).attr("data-version") + ",/" + $(this).attr("data-pooleditemname"), "_blank");
            }
        }