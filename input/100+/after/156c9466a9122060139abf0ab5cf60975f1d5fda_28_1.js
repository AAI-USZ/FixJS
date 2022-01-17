function() {
            $('#subnavigation_add_collection_link').on('click', openAddNewCollection);
            $(window).on('create.collections.sakai', openAddNewCollection);
            $(window).on('done.deletecontent.sakai', removeFromLibraryCount);
            $(window).on('done.newaddcontent.sakai', function() {
                addToCollectionCount('library', 0, false);
            });
            $(window).on('sakai.mylibrary.deletedCollections', function(ev, data) {
                if (infinityCollectionScroll) {
                    infinityCollectionScroll.removeItems(data.items);
                }
            });
            $(window).on('start.drag.sakai', function() {
                if (!$inserterWidget.is(':visible')) {
                    toggleInserter();
                }
            });
            $(document).on('click', inserterToggle, toggleInserter);
            $inserterCollectionInfiniteScrollContainer.on('click', 'li', collectionClicked);
            $inserterCollectionContentContainer.on('click', inserterAllCollectionsButton, refreshWidget);
            $inserterCollectionContentContainer.on('submit', inserterCollectionContentSearchForm, searchCollection);
            $inserterCollectionContentContainer.on('change', inserterMimetypeFilter, function() {
                showCollection(contentListDisplayed);
            });
            $(window).off('sakai.collections.created').on('sakai.collections.created', refreshWidget);
            $(window).off('sakai.inserter.dropevent').on('sakai.inserter.dropevent', addDroppedToCollection);
            $(window).off('scroll', checkInserterPosition).on('scroll', checkInserterPosition);
            $(window).on('updateCount.inserter.sakai', updateCollectionCount);
        }