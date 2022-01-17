function(){
                collectionData[parseInt($('.collectionviewer_carousel_item.selected', $rootel).attr('data-page-index'),10)][parseInt($('.collectionviewer_carousel_item.selected', $rootel).attr('data-arr-index'), 10)].numComments++;
                $('.collectionviewer_comments_count', $rootel).text(collectionData[parseInt($('.collectionviewer_carousel_item.selected', $rootel).attr('data-page-index'), 10)][parseInt($('.collectionviewer_carousel_item.selected', $rootel).attr('data-arr-index'), 10)].numComments);
            }