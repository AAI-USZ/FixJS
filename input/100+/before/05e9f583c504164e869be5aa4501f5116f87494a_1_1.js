function(){
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
        }