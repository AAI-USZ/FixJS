function(){

            // Header bindings
            $("#collectionviewer_carousel_view", $rootel).live("click", function(){
                $.bbq.pushState({"ls":"carousel"});
                fetchCollectionData = true;
            });

            $("#collectionviewer_grid_view", $rootel).live("click", function(){
                $.bbq.pushState({"ls":"grid", "lp": collectionviewer.page, "item": ""});
                fetchCollectionData = true;
            });

            $("#collectionviewer_list_view", $rootel).live("click", function(){
                $.bbq.pushState({"ls":"list", "lp": collectionviewer.page, "item": ""});
                fetchCollectionData = true;
            });

            $("#collectionviewer_edit_collection_button", $rootel).live("click", function(){
                $.bbq.pushState({'ls':'edit', 'item': ''});
                fetchCollectionData = true;
            });

            $(window).bind('hashchange', handleHashChange);

            // Carousel bindings
            $(".collectionviewer_carousel_item", $rootel).live("click", function(){
                if(collectionviewer.listStyle === "carousel"){
                    $.bbq.pushState({"item": $(this).attr("data-item-id"), "lp": ""});
                    fetchCollectionData = false;
                }
                if(initialload){
                    initialload = false;
                    handleHashChange();
                }
            });

            $(".collectionviewer_comments_button", $rootel).live("click", showComments);

            $(window).bind("ready.pageviewer.sakai", function(){
                doStart("pageviewer");
            });

            $(window).bind("ready.collectioncontentpreview.sakai", function() {
                doStart("collectioncontentpreview");
            });

            $("#collectionviewer_sortby", $rootel).change(function(){
                var sortSelection = $(this).val();
                if (sortSelection === "desc") {
                    collectionviewer.sortOrder = "desc";
                    $.bbq.pushState({"so": "desc"});
                } else if (sortSelection === "asc") {
                    collectionviewer.sortOrder = "asc";
                    $.bbq.pushState({"so": "asc"});
                } else {
                    collectionviewer.sortOrder = "modified";
                    $.bbq.pushState({"so": "modified"});
                }
            });

            $(".collectionviewer_collection_item_comments #contentcomments_postComment", $rootel).live("click", function(){
                collectionData[parseInt($(".collectionviewer_carousel_item.selected").attr("data-page-index"),10)][parseInt($(".collectionviewer_carousel_item.selected").attr("data-arr-index"), 10)].numComments++;
                $(".collectionviewer_comments_count").text(collectionData[parseInt($(".collectionviewer_carousel_item.selected").attr("data-page-index"), 10)][parseInt($(".collectionviewer_carousel_item.selected").attr("data-arr-index"), 10)].numComments);
            });

            $("#collectionviewer_finish_editing_collection_button", $rootel).click(function(){
                $(this).hide();
                $("#collectionviewer_edit_collection_button", $rootel).show();
                $.bbq.pushState({"ls":"carousel"});
            });

            $("#collectionviewer_select_all", $rootel).live("click", function(){
                if($(this).is(":checked")){
                    $(".collectionviewer_check:visible").attr("checked", true);
                } else{
                    $(".collectionviewer_check:visible").removeAttr("checked");
                }
                checkEditingEnabled();
            });

            $(".collectionviewer_check", $rootel).live("change", checkEditingEnabled);

            $("#collections_remove_button", $rootel).live("click", function() {
                var $checked = $(".collectionviewer_check:checked:visible", $rootel);
                if ($checked.length) {
                    var paths = [];
                    $checked.each(function () {
                        paths.push($(this).attr("id").split("collectionviewer_check_")[1]);
                    });
                    $(window).trigger('init.deletecontent.sakai', [{
                        paths: paths,
                        context: collectionviewer.contextId
                    }, function (success) {
                        sakai.api.Util.progressIndicator.showProgressIndicator(sakai.api.i18n.getValueForKey("REMOVING_CONTENT_FROM_COLLECTION", "collectionviewer"), sakai.api.i18n.getValueForKey("PROCESSING", "collectionviewer"));
                        $(".collectionviewer_check:checked:visible").parents("li").hide("slow");
                        setTimeout(refreshCollection, 1500);
                    }]);
                }
            });

            $(".collectionviewer_remove_icon", $rootel).live("click", function(){
                var $itemToRemove = $(this);
                var toRemoveId = $itemToRemove.attr("data-entityid");
                $(window).trigger('init.deletecontent.sakai', [{
                    paths: [toRemoveId],
                    context: collectionviewer.contextId
                }, function (success) {
                    $itemToRemove.parents("li").hide("slow");
                    setTimeout(refreshCollection, 1500);
                }]);
            });

            $(window).bind("done.newaddcontent.sakai", function(ev, data){
                switchListView();
            });

            $(".collectionviewer_widget", $rootel).on("click", "#collectionviewer_expanded_content_container .s3d-search-result .share_trigger_click, #collectionviewer_expanded_content_container .s3d-search-result .savecontent_trigger", function() {
                $(this).parents(".s3d-search-result").addClass("hovered");
            });

            $(window).bind("hiding.newsharecontent.sakai hiding.savecontent.sakai", function() {
                $("#collectionviewer_expanded_content_container .s3d-search-result.hovered").removeClass("hovered");
            });

        }