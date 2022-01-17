function(which) {
            if ($rootel.is(":visible")) {
                var arrIndex1 = 0;
                if ($(".collectionviewer_carousel_item.selected", $rootel).length){
                    arrIndex1 = parseInt($(".collectionviewer_carousel_item.selected", $rootel).attr("data-page-index"), 10);
                }
                var arrIndex2 = 0;
                if ($(".collectionviewer_carousel_item.selected", $rootel).length) {
                    arrIndex2 = parseInt($(".collectionviewer_carousel_item.selected", $rootel).attr("data-arr-index"), 10);
                }
                if (which === "collectioncontentpreview" && collectionviewer.listStyle === "carousel") {
                    $(window).trigger("start.collectioncontentpreview.sakai", collectionData[arrIndex1][arrIndex2]);
                    $(".collectionviewer_collection_item_preview", $rootel).show();
                } else if (which === "pageviewer") {
                    $(window).trigger("start.pageviewer.sakai", collectionData[arrIndex1][arrIndex2]);
                }
            }
        }