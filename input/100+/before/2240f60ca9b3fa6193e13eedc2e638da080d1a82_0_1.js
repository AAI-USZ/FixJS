function(){
        var user = this.USER;
        var name = "";
        var group_str = "";
        if (user.NAME && user.NAME != {}){
            name = user.NAME;
        }

        // if (user.GROUPS.ID){
        //     $.each(user.GROUPS.ID,function() {
        //         groups_str += this +", ";
        //     });
        // }
        if (zone_id){
            user_array.push([
                zone_id,
                zone_name,
                user.ID,
                name
            ]);
        } else {
            user_array.push([
                user.ID,
                name
            ]);
        }

    }