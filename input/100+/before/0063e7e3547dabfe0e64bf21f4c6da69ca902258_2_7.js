function() {
            // This will be empty when you switch a listview, so we should trigger that function instead
            if (!$.bbq.getState('item')) {
                switchListView();
                return;
            }
            var $element = $(".collectionviewer_carousel_item[data-item-id=" + $.bbq.getState("item") + "]");
            $(".collectionviewer_carousel_item", $rootel).removeClass("selected");
            $element.addClass("selected");
            $(window).unbind("ready.collectionviewer.sakai");
            $(window).unbind("start.collectioncontentpreview.sakai");
            renderItemsForSelected(parseInt($element.attr("data-page-index"), 10), parseInt($element.attr("data-arr-index"), 10));
        }