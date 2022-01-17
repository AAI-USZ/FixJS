function updateGroupsView(request, group_list){
    group_list_json = group_list;
    var group_list_array = [];

    $.each(group_list,function(){
        group_list_array.push(groupElementArray(this));
    });
    updateView(group_list_array,dataTable_groups);
    updateGroupSelect(group_list);
    SunstoneMonitoring.monitor('GROUP', group_list)
    if (mustBeAdmin())
        updateSystemDashboard("groups",group_list);
}