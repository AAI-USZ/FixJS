function groupElementArray(group_json){
    var group = group_json.GROUP;

    var users_str="";
    if (group.USERS.ID &&
        group.USERS.ID.constructor == Array){
        for (var i=0; i<group.USERS.ID.length; i++){
            users_str+=getUserName(group.USERS.ID[i])+', ';
        };
        users_str=users_str.slice(0,-2);
    } else if (group.USERS.ID) {
        users_str=getUserName(group.USERS.ID);
    };

    var vms = "-";
    var memory = "-";
    var cpu = "-";

    if (!$.isEmptyObject(group.VM_QUOTA)){
        vms = group.VM_QUOTA.VM.VMS_USED;
        memory = group.VM_QUOTA.VM.MEMORY_USED;
        cpu = group.VM_QUOTA.VM.CPU_USED;
    }

    return [
        '<input class="check_item" type="checkbox" id="group_'+group.ID+'" name="selected_items" value="'+group.ID+'"/>',
        group.ID,
        group.NAME,
        users_str,
        vms,
        memory,
        cpu
    ];
}