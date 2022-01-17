function(){
            sakai.api.Util.TemplateRenderer("collectionviewer_carousel_template", {
                data: collectionData,
                sakai: sakai,
                collectionName: getCollectionName(),
                collectionId: sakai.api.Content.Collections.getCollectionPoolId(collectionviewer.contextId),
                isManager: sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)
            }, $collectionviewerCarouselContainer);
            $("#collectionviewer_finish_editing_collection_button").hide();
            if(sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)){
                $("#collectionviewer_edit_collection_button").show();
            }
            $collectionviewerCarouselContainer.show();
            $collectionviewerExpandedContentContainer.show();
            $(".collectionviewer_controls", $rootel).hide();
            if(collectionData.length){
                var totalItems = 0;
                $.each(collectionData, function(index, item){
                    if (item){
                        totalItems += item.length;
                    }
                });
                if (totalItems > 12) {
                    $(".collectionviewer_controls", $rootel).show();
                }
                $("#collectionviewer_carousel", $rootel).jcarousel({
                    animation: "slow",
                    easing: "swing",
                    scroll: 12,
                    start: 0,
                    initCallback: carouselBinding,
                    itemFallbackDimension: 123
                });
                $("#collectionviewer_carousel", $rootel).data("jcarousel").scroll($(".collectionviewer_carousel_item[data-item-id=" + $.bbq.getState("item") + "]", $rootel).attr("data-arr-index"));
            }
        }