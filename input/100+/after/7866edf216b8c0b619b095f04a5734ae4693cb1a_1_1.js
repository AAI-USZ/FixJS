function(){
                jQuery("#displaytokens").jqGrid('setGridParam',{
                    url:jsonUrl,
                    gridComplete: function(){
                        if(jQuery("#displaytokens").jqGrid('getGridParam', 'records') == 0) {
                            var dialog_buttons={};
                            dialog_buttons[okBtn]=function(){
                                $( this ).dialog( "close" );
                            };
                            $("<p>"+noSearchResultsTxt+"</p>").dialog({
                                modal: true,
                                buttons: dialog_buttons,
                                resizable: false
                            });
                        }
                    }
                });
                $("#displaytokens").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
            }