function(){
            var dialog_buttons={};
            dialog_buttons[searchBtn]=function(){
                searchconditions="";
                var dialog_buttons={};
                if($('#field_1').val() == '') {
                    dialog_buttons[okBtn]=function(){
		                $( this ).dialog( "close" );
                    };
                    /* End of building array for button functions */
                    $('#fieldnotselected').dialog({
			            modal: true,
                        title: error,
 			            buttons: dialog_buttons
                    });
                }
                else if($('#condition_1').val()=="") {
                    dialog_buttons[okBtn]=function(){
		                $( this ).dialog( "close" );
                    };
                    /* End of building array for button functions */
                    $('#conditionnotselected').dialog({
			            modal: true,
                        title: error,
 			            buttons: dialog_buttons
                    });
                } else {
                    if(id == 1) {
                        searchconditions = searchconditions + $('#field_1').val()+"||"+$('#condition_1').val()+"||"+$('#conditiontext_1').val();
                        jQuery("#displaytokens").jqGrid('setGridParam',{ url:jsonSearchUrl+'/'+searchconditions}).trigger("reloadGrid");
                    } else {
                        searchconditions = $('#field_1').val()+"||"+$('#condition_1').val()+"||"+$('#conditiontext_1').val();
                        for( i=2 ; i<=idexternal; i++) {
                            if($('#field_'+i).val()) {
                                searchconditions = searchconditions + "||"+ $('#join_'+(i)).val()+"||"+$('#field_'+i).val()+"||"+$('#condition_'+i).val()+"||"+$('#conditiontext_'+i).val();
                            }
                        }
                        jQuery("#displaytokens").jqGrid('setGridParam',{ url:jsonSearchUrl+'/'+searchconditions}).trigger("reloadGrid");
                    }
                    $(this).dialog("close");
                }
            };
			dialog_buttons[cancelBtn]=function(){
                $(this).dialog("close");
			};
			/* End of building array for button functions */
	        $("#search").dialog({
                height: 300,
				width: 750,
				modal: true,
                title : 'Full Search',
	            buttons: dialog_buttons
	        });
        }