function(index) {
                if ($(this).attr("sakai-entityid") === userToAdd.uuid){
                    $(this).hide();
                    $("#contacts_left_filler_"+userToAdd.uuid).show();
                }
            }