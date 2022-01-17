function(){
        var myGrid = $("#displayparticipants").jqGrid();
        var row = myGrid .getGridParam('selarrrow');
        if(row=="") {
            /* build an array containing the various button functions */
            /* Needed because it's the only way to label a button with a variable */
            var dialog_buttons={};
            dialog_buttons[okBtn]=function(){
                $( this ).dialog( "close" );
            };
            /* End of building array for button functions */
            $('#norowselected').dialog({
                modal: true,
                buttons: dialog_buttons
            });
        } else {
            /* build an array containing the various button functions */
            /* Needed because it's the only way to label a button with a variable */
            var dialog_buttons={};
            dialog_buttons[spAddBtn]=function(){
                var row = myGrid .getGridParam('selarrrow');
                shareParticipants(row);
            };
            dialog_buttons[cancelBtn]=function(){
                $(this).dialog("close");
            };
            /* End of building array for button functions */

            $("#shareform").dialog({
                height: 300,
                width: 350,
                modal: true,
                buttons: dialog_buttons
            });
        }
        if (!($("#shareuser").length > 0)) {
            $('#shareform').html(sfNoUser);
        }
    }