function() {
                var $checked = $('.collectionviewer_check:checked:visible', $rootel);
                if ($checked.length) {
                    var paths = [];
                    $checked.each(function () {
                        paths.push($(this).attr('id').split('collectionviewer_check_')[1]);
                    });
                    $(document).trigger('init.deletecontent.sakai', [{
                        paths: paths,
                        context: collectionviewer.contextId
                    }, function (success) {
                        sakai.api.Util.progressIndicator.showProgressIndicator(sakai.api.i18n.getValueForKey('REMOVING_CONTENT_FROM_COLLECTION', 'collectionviewer'), sakai.api.i18n.getValueForKey('PROCESSING_COLLECTION', 'collectionviewer'));
                        $('.collectionviewer_check:checked:visible', $rootel).parents('li:not(.contentauthoring_row_container)').hide('slow');
                        setTimeout(refreshCollection, 1500);
                    }]);
                }
            }