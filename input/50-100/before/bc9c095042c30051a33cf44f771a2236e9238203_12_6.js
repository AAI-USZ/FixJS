function(){
                if($(this).is(":checked")){
                    $("#mymemberships_addpeople_button").removeAttr("disabled");
                    $(".mymemberships_select_group_checkbox").attr("checked", true);
                } else{
                    $("#mymemberships_addpeople_button").attr("disabled", true);
                    $(".mymemberships_select_group_checkbox").removeAttr("checked");
                }
                checkAddingEnabled();
                updateMessageAndAddToData();
            }