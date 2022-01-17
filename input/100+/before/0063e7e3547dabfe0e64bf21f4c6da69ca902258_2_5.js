function(){
            if($(".collectionviewer_collection_item_comments", $rootel).is(":visible")){
                $(".collectionviewer_collection_item_comments", $rootel).toggle();
            } else if ($rootel.is(":visible")) {
                var $selectedItem = $(".collectionviewer_carousel_item.selected", $rootel);
                var contentProfile = {
                    data: collectionData[parseInt($selectedItem.attr("data-page-index"), 10)][parseInt($selectedItem.attr("data-arr-index"),10)]
                };
                $(window).trigger("start.collectioncomments.sakai", contentProfile);
                $(".collectionviewer_collection_item_comments", $rootel).toggle();
            }
        }