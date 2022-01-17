function(mode){
            sakai_global.content_profile.content_data.mode = mode;
            var json = {
                data: sakai_global.content_profile.content_data,
                sakai: sakai,
                tags: sakai.api.Util.formatTags(sakai_global.content_profile.content_data.data["sakai:tags"])
            };
            $contentmetadataTagsContainer.html(sakai.api.Util.TemplateRenderer(contentmetadataTagsTemplate, json));
            $contentmetadataTagsContainer.toggleClass("contentmetadata_editing", mode === "edit");
            $contentmetadataTagsContainer.toggleClass("contentmetadata_editable", mode !== "edit");
            if (mode === "edit") {
                $contentmetadataAutosuggestElt = $( "#contentmetadata_tags_tags" );
                sakai.api.Util.AutoSuggest.setupTagAndCategoryAutosuggest($contentmetadataAutosuggestElt , null, $( ".list_categories", $contentmetadataTagsContainer ), sakai_global.content_profile.content_data.data["sakai:tags"] );
                $( ".as-selections", $contentmetadataTagsContainer ).addClass( "contentmetadata_edit_input" );
                $contentmetadataAutosuggestElt.focus();
            }
            addEditBinding( mode, true );
        }