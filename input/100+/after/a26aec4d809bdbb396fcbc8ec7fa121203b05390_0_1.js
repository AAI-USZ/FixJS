function(event) {
        event.preventDefault();

        var $this_anchor = $(this);

        //extract current table name and build the question string
        /**
         * @var $curr_row    Object containing reference to the current row
         */
        var $curr_row = $this_anchor.parents('tr');
        /**
         * @var curr_table_name String containing the name of the table to be truncated
         */
        var curr_table_name = $curr_row.children('th').children('a').text();
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = 'DROP ';
        if ($this_anchor.hasClass('view')) {
            question += 'VIEW';
        } else {
            question += 'TABLE';
        }
        question += ' ' + curr_table_name;

        $this_anchor.PMA_confirm(question, $this_anchor.attr('href'), function(url) {

            PMA_ajaxShowMessage(PMA_messages['strProcessingRequest']);

            $.get(url, {'is_js_confirmed' : 1, 'ajax_request' : true}, function(data) {
                if (data.success == true) {
                    PMA_ajaxShowMessage(data.message);
                    toggleRowColors($curr_row.next());
                    $curr_row.hide("medium").remove();
                    PMA_adjustTotals();

                    if (window.parent && window.parent.frame_navigation) {
                        window.parent.frame_navigation.location.reload();
                    }
                } else {
                    PMA_ajaxShowMessage(PMA_messages['strErrorProcessingRequest'] + " : " + data.error, false);
                }
            }); // end $.get()
        }); // end $.PMA_confirm()
    }