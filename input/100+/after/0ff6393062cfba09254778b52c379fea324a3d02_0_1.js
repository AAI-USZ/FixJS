function() {
    /**
     * Row marking in horizontal mode (use "live" so that it works also for
     * next pages reached via AJAX); a tr may have the class noclick to remove
     * this behavior.
     */
    $('table:not(.noclick) tr.odd:not(.noclick), table:not(.noclick) tr.even:not(.noclick)').live('click', function(e) {
        // do not trigger when clicked on anchor
        if ($(e.target).is('a, img, a *')) {
            return;
        }
        var $tr = $(this);

        // make the table unselectable (to prevent default highlighting when shift+click)
        //$tr.parents('table').noSelect();

        if (!e.shiftKey || last_clicked_row == -1) {
            // usual click

            // XXX: FF fires two click events for <label> (label and checkbox), so we need to handle this differently
            var $checkbox = $tr.find(':checkbox');
            if ($checkbox.length) {
                // checkbox in a row, add or remove class depending on checkbox state
                var checked = $checkbox.prop('checked');
                if (!$(e.target).is(':checkbox, label')) {
                    checked = !checked;
                    $checkbox.prop('checked', checked);
                }
                if (checked) {
                    $tr.addClass('marked');
                } else {
                    $tr.removeClass('marked');
                }
                last_click_checked = checked;
            } else {
                // normaln data table, just toggle class
                $tr.toggleClass('marked');
                last_click_checked = false;
            }

            // remember the last clicked row
            last_clicked_row = last_click_checked ? $('tr.odd:not(.noclick), tr.even:not(.noclick)').index(this) : -1;
            last_shift_clicked_row = -1;
        } else {
            // handle the shift click
            PMA_clearSelection();
            var start, end;

            // clear last shift click result
            if (last_shift_clicked_row >= 0) {
                if (last_shift_clicked_row >= last_clicked_row) {
                    start = last_clicked_row;
                    end = last_shift_clicked_row;
                } else {
                    start = last_shift_clicked_row;
                    end = last_clicked_row;
                }
                $tr.parent().find('tr.odd:not(.noclick), tr.even:not(.noclick)')
                    .slice(start, end + 1)
                    .removeClass('marked')
                    .find(':checkbox')
                    .prop('checked', false);
            }

            // handle new shift click
            var curr_row = $('tr.odd:not(.noclick), tr.even:not(.noclick)').index(this);
            if (curr_row >= last_clicked_row) {
                start = last_clicked_row;
                end = curr_row;
            } else {
                start = curr_row;
                end = last_clicked_row;
            }
            $tr.parent().find('tr.odd:not(.noclick), tr.even:not(.noclick)')
                .slice(start, end + 1)
                .addClass('marked')
                .find(':checkbox')
                .prop('checked', true);

            // remember the last shift clicked row
            last_shift_clicked_row = curr_row;
        }
    });

    addDateTimePicker();
   
    /**
     * Add attribute to text boxes for iOS devices (based on bugID: 3508912)
     */
    if (navigator.userAgent.match(/(iphone|ipod|ipad)/i)) {
        $('input[type=text]').attr('autocapitalize','off').attr('autocorrect','off');
    }
}