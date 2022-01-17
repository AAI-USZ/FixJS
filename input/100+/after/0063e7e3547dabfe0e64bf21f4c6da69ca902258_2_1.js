function(){
            sakai.api.Util.TemplateRenderer("collectionviewer_carousel_template", {
                data: collectionData,
                sakai: sakai,
                collectionName: getCollectionName(),
                collectionId: getCollectionId(collectionviewer.contextId),
                isManager: sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)
            }, $collectionviewerCarouselContainer);
            $('#collectionviewer_finish_editing_collection_button', $rootel).hide();
            if(sakai.api.Content.Collections.canCurrentUserManageCollection(collectionviewer.contextId)){
                $('#collectionviewer_edit_collection_button', $rootel).show();
            }
            $collectionviewerCarouselContainer.animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 500);
            $collectionviewerExpandedContentContainer.animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 500);
            $(".collectionviewer_controls", $rootel).hide();
            if(collectionData.length){
                var totalItems = 0;
                $.each(collectionData, function(index, item){
                    if (item){
                        totalItems += item.length;
                    }
                });
                if (totalItems > carouselSize) {
                    $(".collectionviewer_controls", $rootel).show();
                }
                $("#collectionviewer_carousel", $rootel).jcarousel({
                    animation: "slow",
                    easing: "swing",
                    scroll: carouselSize,
                    start: 0,
                    initCallback: carouselBinding,
                    itemFallbackDimension: 123
                });

                if (totalItems > carouselSize) {
                    $("#collectionviewer_carousel", $rootel).data("jcarousel").scroll($(".collectionviewer_carousel_item[data-item-id=" + $.bbq.getState("item") + "]", $rootel).attr("data-arr-index"));
                }
            }
        }