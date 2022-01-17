function() {
                var $itemToRemove = $(this);
                var toRemoveId = $itemToRemove.attr('data-entityid');
                $(document).trigger('init.deletecontent.sakai', [{
                    paths: [toRemoveId],
                    context: collectionviewer.contextId
                }, function (success) {
                    $itemToRemove.parents('li:not(.contentauthoring_row_container)').hide('slow');
                    setTimeout(refreshCollection, 1500);
                }]);
            }