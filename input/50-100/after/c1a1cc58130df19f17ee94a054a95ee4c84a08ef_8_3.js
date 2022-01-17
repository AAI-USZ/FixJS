function updateUsersView(request,users_list){
    var user_list_array = [];

    $.each(users_list,function(){
        if (this.USER.ID == uid)
            dashboardQuotasHTML(this.USER);
        user_list_array.push(userElementArray(this));
    });
    updateView(user_list_array,dataTable_users);
    SunstoneMonitoring.monitor('USER', users_list)
    if (mustBeAdmin())
        updateSystemDashboard("users",users_list);
    updateUserSelect();
}