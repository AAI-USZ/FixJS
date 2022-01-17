function() {
    /**
     * Ajax Event handler for 'Insert Table'
     *
     * @uses    PMA_ajaxShowMessage()
     * @see     $cfg['AjaxEnable']
     */
    var current_insert_table;
    $("td.insert_table a.ajax").live('click', function(event){
        event.preventDefault();
        current_insert_table = $(this);
        var $url = $(this).attr("href");
        if ($url.substring(0, 15) == "tbl_change.php?") {
            $url = $url.substring(15);
        }

        if ($("#insert_table_dialog").length > 0) {
            $("#insert_table_dialog").remove();
        }
           var $div = $('<div id="insert_table_dialog"></div>');
           var target = "tbl_change.php";

        /**
         *  @var    button_options  Object that stores the options passed to jQueryUI
         *                          dialog
         */
        var button_options = {};
        // in the following function we need to use $(this)
        button_options[PMA_messages['strCancel']] = function() {$(this).dialog('close').remove();}

        var button_options_error = {};
        button_options_error[PMA_messages['strOK']] = function() {$(this).dialog('close').remove();}

        var $msgbox = PMA_ajaxShowMessage();

        $.get( target , $url+"&ajax_request=true" ,  function(data) {
            //in the case of an error, show the error message returned.
            if (data.success != undefined && data.success == false) {
                $div
                .append(data.error)
                .dialog({
                    title: PMA_messages['strInsertTable'],
                    height: 230,
                    width: 900,
                    modal: true,
                    open: PMA_verifyColumnsProperties,
                    buttons : button_options_error
                })// end dialog options
            } else {
                var $dialog = $div
                    .append(data)
                    .dialog({
                        title: PMA_messages['strInsertTable'],
                        height: 600,
                        width: 900,
                        modal: true,
                        open: PMA_verifyColumnsProperties,
                        buttons : button_options
                    });// end dialog options
                //Remove the top menu container from the dialog
                $dialog.find("#topmenucontainer").hide();
                //Adding the datetime pikers for the dialog
                $dialog.find('.datefield, .datetimefield').each(function () {
                    PMA_addDatepicker($(this));
                });
                $(".insertRowTable").addClass("ajax");
                $("#buttonYes").addClass("ajax");
                $div = $("#insert_table_dialog");
                PMA_convertFootnotesToTooltips($div);
            }
            PMA_ajaxRemoveMessage($msgbox);
        }) // end $.get()

    });

    $("#insertForm .insertRowTable.ajax input[type=submit]").live('click', function(event) {
        event.preventDefault();
        /**
         *  @var    the_form    object referring to the insert form
         */
        var $form = $("#insertForm");
        $("#result_query").remove();
        PMA_prepareForAjaxRequest($form);
        //User wants to submit the form
        $.post($form.attr('action'), $form.serialize() , function(data) {
            if(data.success == true) {
                PMA_ajaxShowMessage(data.message);
            } else {
                PMA_ajaxShowMessage(data.error, false);
            }
            if ($("#insert_table_dialog").length > 0) {
                $("#insert_table_dialog").dialog("close").remove();
            }
            /**Update the row count at the tableForm*/
            current_insert_table.closest('tr').find('.value.tbl_rows').html(data.row_count);
            PMA_adjustTotals();
        }) // end $.post()
    }) // end insert table button "Go"

    $("#buttonYes.ajax").live('click', function(event){
        event.preventDefault();
        /**
         *  @var    the_form    object referring to the insert form
         */
        var $form = $("#insertForm");
        /**Get the submit type and the after insert type in the form*/
        var selected_submit_type = $("#insertForm").find("#actions_panel .control_at_footer option:selected").attr('value');
        var selected_after_insert = $("#insertForm").find("#actions_panel select[name=after_insert] option:selected").attr('value');
        $("#result_query").remove();
        PMA_prepareForAjaxRequest($form);
        //User wants to submit the form
        $.post($form.attr('action'), $form.serialize() , function(data) {
            if(data.success == true) {
                PMA_ajaxShowMessage(data.message);
                if (selected_submit_type == "showinsert") {
                    $(data.sql_query).insertAfter("#floating_menubar");
                    $("#result_query .notice").remove();
                    $("#result_query").prepend((data.message));
                }
                if (selected_after_insert == "new_insert") {
                    /**Trigger the insert dialog for new_insert option*/
                    current_insert_table.trigger('click');
                }

            } else {
                PMA_ajaxShowMessage(data.error, false);
            }
            if ($("#insert_table_dialog").length > 0) {
                $("#insert_table_dialog").dialog("close").remove();
            }
            /**Update the row count at the tableForm*/
            current_insert_table.closest('tr').find('.value.tbl_rows').html(data.row_count);
            PMA_adjustTotals();
        }) // end $.post()
    });

    /**
     * Ajax Event handler for 'Truncate Table'
     *
     * @uses    $.PMA_confirm()
     * @uses    PMA_ajaxShowMessage()
     * @see     $cfg['AjaxEnable']
     */
    $(".truncate_table_anchor").live('click', function(event) {
        event.preventDefault();

        /**
         * @var $this_anchor Object  referring to the anchor clicked
         */
        var $this_anchor = $(this);

        //extract current table name and build the question string
        /**
         * @var curr_table_name String containing the name of the table to be truncated
         */
        var curr_table_name = $this_anchor.parents('tr').children('th').children('a').text();
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = 'TRUNCATE ' + curr_table_name;

        $this_anchor.PMA_confirm(question, $this_anchor.attr('href'), function(url) {

            PMA_ajaxShowMessage(PMA_messages['strProcessingRequest']);

            $.get(url, {'is_js_confirmed' : 1, 'ajax_request' : true}, function(data) {
                if (data.success == true) {
                    PMA_ajaxShowMessage(data.message);
                    // Adjust table statistics
                    var $tr = $this_anchor.closest('tr');
                    $tr.find('.tbl_rows').text('0');
                    $tr.find('.tbl_size, .tbl_overhead').text('-');
                    //Fetch inner span of this anchor
                    //and replace the icon with its disabled version
                    var span = $this_anchor.html().replace(/b_empty/, 'bd_empty');
                    //To disable further attempts to truncate the table,
                    //replace the a element with its inner span (modified)
                    $this_anchor
                        .replaceWith(span)
                        .removeClass('truncate_table_anchor');
                    PMA_adjustTotals();
                } else {
                    PMA_ajaxShowMessage(PMA_messages['strErrorProcessingRequest'] + " : " + data.error, false);
                }
            }) // end $.get()
        }) //end $.PMA_confirm()
    }); //end of Truncate Table Ajax action

    /**
     * Ajax Event handler for 'Drop Table' or 'Drop View'
     *
     * @uses    $.PMA_confirm()
     * @uses    PMA_ajaxShowMessage()
     * @see     $cfg['AjaxEnable']
     */
    $(".drop_table_anchor").live('click', function(event) {
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
    }); //end of Drop Table Ajax action

    /**
     * Ajax Event handler for 'Drop tracking'
     *
     * @uses    $.PMA_confirm()
     * @uses    PMA_ajaxShowMessage()
     * @see     $cfg['AjaxEnable']
     */
    $('.drop_tracking_anchor').live('click', function(event) {
        event.preventDefault();

        var $anchor = $(this);

        /**
         * @var curr_tracking_row   Object containing reference to the current tracked table's row
         */
        var $curr_tracking_row = $anchor.parents('tr');
         /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = PMA_messages['strDeleteTrackingData'];

        $anchor.PMA_confirm(question, $anchor.attr('href'), function(url) {

            PMA_ajaxShowMessage(PMA_messages['strDeletingTrackingData']);

            $.get(url, {'is_js_confirmed': 1, 'ajax_request': true}, function(data) {
                if(data.success == true) {
                    var $tracked_table = $curr_tracking_row.parents('table');
                    var table_name = $curr_tracking_row.find('td:nth-child(2)').text();

                    // Check how many rows will be left after we remove
                    if ($tracked_table.find('tbody tr').length === 1) {
                        // We are removing the only row it has
                        $('#tracked_tables').hide("slow").remove();
                    } else {
                        // There are more rows left after the deletion
                        toggleRowColors($curr_tracking_row.next());
                        $curr_tracking_row.hide("slow", function() {
                            $(this).remove();
                        });
                    }

                    // Make the removed table visible in the list of 'Untracked tables'.
                    $untracked_table = $('table#noversions');

                    // This won't work if no untracked tables are there.
                    if ($untracked_table.length > 0) {
                        var $rows = $untracked_table.find('tbody tr');

                        $rows.each(function(index) {
                            var $row = $(this);
                            var tmp_tbl_name = $row.find('td:first-child').text();
                            var is_last_iteration = (index == ($rows.length - 1));

                            if (tmp_tbl_name > table_name || is_last_iteration) {
                                var $cloned = $row.clone();

                                // Change the table name of the cloned row.
                                $cloned.find('td:first-child').text(table_name);

                                // Change the link of the cloned row.
                                var new_url = $cloned
                                    .find('td:nth-child(2) a')
                                    .attr('href')
                                    .replace('table=' + tmp_tbl_name, 'table=' + encodeURIComponent(table_name));
                                $cloned.find('td:nth-child(2) a').attr('href', new_url);

                                // Insert the cloned row in an appropriate location.
                                if (tmp_tbl_name > table_name) {
                                    $cloned.insertBefore($row);
                                    toggleRowColors($row);
                                    return false;
                                } else {
                                    $cloned.insertAfter($row);
                                    toggleRowColors($cloned);
                                }
                            }
                        });
                    }

                    PMA_ajaxShowMessage(data.message);
                } else {
                    PMA_ajaxShowMessage(PMA_messages['strErrorProcessingRequest'] + " : " + data.error, false);
                }
            }); // end $.get()
        }); // end $.PMA_confirm()
    }); //end Drop Tracking

    //Calculate Real End for InnoDB
    /**
     * Ajax Event handler for calculatig the real end for a InnoDB table
     *
     * @uses    $.PMA_confirm
     */
    $('#real_end_input').live('click', function(event) {
        event.preventDefault();

        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = PMA_messages['strOperationTakesLongTime'];

        $(this).PMA_confirm(question, '', function() {
            return true;
        })
        return false;
    }) //end Calculate Real End for InnoDB

}