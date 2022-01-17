function(index) {
                if ($(this).attr("sakai-entityid") === userToAdd.uuid){
                    $(this).hide();
                    $("#searchpeople_result_left_filler_"+userToAdd.uuid).show();
                }
            }