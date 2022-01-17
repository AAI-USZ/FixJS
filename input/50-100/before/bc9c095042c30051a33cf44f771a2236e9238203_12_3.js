function(){
            if($(".mymemberships_select_group_checkbox:checked")[0]){
                $("#mymemberships_addpeople_button").removeAttr("disabled");
                $("#mymemberships_message_button").removeAttr("disabled");
            } else {
                $("#mymemberships_addpeople_button").attr("disabled", true);
                $("#mymemberships_message_button").attr("disabled", true);
                $("#mymemberships_select_checkbox").removeAttr("checked");
            }
        }