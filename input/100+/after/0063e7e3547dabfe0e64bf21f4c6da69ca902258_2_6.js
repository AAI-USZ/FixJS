function() {
            collectionviewer.listStyle = $.bbq.getState(collectionviewer.tuidls) || 'carousel';
            $('.s3d-listview-options', $rootel).children('.selected').children().removeClass('selected');
            $('.s3d-listview-options', $rootel).children('.selected').removeClass('selected');
            collectionviewer.page = 1;
            getCollectionData();
        }