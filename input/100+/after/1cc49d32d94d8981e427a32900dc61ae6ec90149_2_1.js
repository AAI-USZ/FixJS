function(data) {
                    if(data.success == true) {
                        PMA_ajaxShowMessage(data.message);

                        var $rowsToRemove = $form.find('tr.removeMe');
                        var $databasesCount = $('#databases_count');
                        var newCount = parseInt($databasesCount.text()) - $rowsToRemove.length;
                        $databasesCount.text(newCount);

                        $rowsToRemove.remove();
                        $form.find('tbody').PMA_sort_table('.name');
                        if (window.parent && window.parent.frame_navigation) {
                            window.parent.frame_navigation.location.reload();
                        }
                    } else {
                        $form.find('tr.removeMe').removeClass('removeMe');
                        PMA_ajaxShowMessage(data.error, false);
                    }
                }