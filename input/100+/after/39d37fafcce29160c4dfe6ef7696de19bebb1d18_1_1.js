function(event) {
        event.preventDefault();

        var $form = $(this.form);

        /**
         * @var selected_dbs Array containing the names of the checked databases
         */
        var selected_dbs = [];
        // loop over all checked checkboxes, except the #checkall checkbox
        $form.find('input:checkbox:checked:not(#checkall)').each(function () {
            $(this).closest('tr').addClass('removeMe');
            selected_dbs[selected_dbs.length] = 'DROP DATABASE `' + escapeHtml($(this).val()) + '`;';
        });
        if (! selected_dbs.length) {
            PMA_ajaxShowMessage(PMA_messages.strNoDatabasesSelected, 2000);
            return;
        }
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question =
            PMA_messages.strDropDatabaseStrongWarning + ' '
            + $.sprintf(PMA_messages.strDoYouReally, selected_dbs.join('<br />'));

        $(this).PMA_confirm(
            question,
            $form.prop('action')
                + '?' + $(this.form).serialize()
                + '&drop_selected_dbs=1&is_js_confirmed=1&ajax_request=true',
            function(url) {
                PMA_ajaxShowMessage(PMA_messages.strProcessingRequest, false);

                $.post(url, function(data) {
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
                }); // end $.post()
        }); // end $.PMA_confirm()
    }