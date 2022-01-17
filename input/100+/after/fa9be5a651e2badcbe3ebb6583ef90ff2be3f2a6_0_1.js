function(){
        var user = this.USER;
        //var group_str = "";

        var vms = "-";
        var memory = "-";
        var cpu = "-";

        if (!$.isEmptyObject(user.VM_QUOTA)){
            vms = user.VM_QUOTA.VM.VMS_USED;
            memory = user.VM_QUOTA.VM.MEMORY_USED+' MB';
            cpu = user.VM_QUOTA.VM.CPU_USED;
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
                user.NAME,
                user.GNAME,
                user.AUTH_DRIVER,
                vms,
                memory,
                cpu,
                user.GID
            ]);
        } else {
            user_array.push([
                user.ID,
                user.NAME,
                user.GNAME,
                user.AUTH_DRIVER,
                vms,
                memory,
                cpu,
                user.GID
            ]);
        }

    }