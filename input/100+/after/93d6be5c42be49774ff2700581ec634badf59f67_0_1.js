function() {
        var selected = "";
        var myGrid = $("#displayparticipants").jqGrid();
        /* the rows variable will contain the UUID of individual items that been ticked in the jqGrid */
        /* if it is empty, then no items have been ticked */
        var rows = myGrid.getGridParam('selarrrow');

        if(rows=="") {
            var totalitems = myGrid.getGridParam('records');
            $('#allinview').text(addAllInViewTxt.replace('%s', totalitems));
            $('#allinview').show();
            $('#selecteditems').hide();
        } else {
            var totalitems = rows.length;
            $('#selecteditems').text(addSelectedItemsTxt.replace('%s', totalitems));
            $('#selecteditems').show();
            $('#allinview').hide();
        }

        var dialog_buttons={};
        dialog_buttons[mapButton]=function(){
            var survey_id=$('#survey_id').val();
            var redirect ="";
            if(survey_id===null) {
                /* No survey has been selected */
                alert(selectSurvey);
            } else {
                /* Check if user wants to see token table after adding new participants */
                if(jQuery('#redirect').is(":checked")) {
                    redirect = "redirect";
                } else {
                    redirect = "";
                }
                /* Submit the form with appropriate options depending on whether
                individual users are selected, or the whole grid is to be copied */
                if(rows=="") { /* All in grid */
                    $.post(
                    getSearchIDs,
                    { searchcondition: jQuery('#displayparticipants').jqGrid('getGridParam','url')},
                    function(data) {
                        $('#count').val($('#ui-dialog-title-addsurvey').text());
                        $('#participant_id').val(data);
                        $("#addsurvey").submit();
                    });
                } else { /* Add selected (checked) jqGrid items only */
                    rows = myGrid.getGridParam('selarrrow');
                    $('#count').val($('#ui-dialog-title-addsurvey').text());
                    $('#participant_id').val(rows);
                    $("#addsurvey").submit();
                }
            }
        };
        dialog_buttons[cancelBtn]=function(){
            $(this).dialog("close");
        };
        /* End of building array containing button functions */

        $("#addsurvey").dialog({
            height: 500,
            width: 500,
            title : addsurvey,
            modal: true,
            open: function(event, ui) {
                $('#addsurvey').dialog('option', 'title', addsurvey + ' ('+totalitems+')');
            },
            buttons: dialog_buttons
        });

        if (!($("#survey_id").length > 0)) {
            $('#addsurvey').html(addpartErrorMsg);
        }
    }