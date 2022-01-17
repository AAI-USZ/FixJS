function updateUsersView(request,users_list){
    var user_list_array = [];

    $.each(users_list,function(){
        user_list_array.push(userElementArray(this));
    });
    updateView(user_list_array,dataTable_users);
    SunstoneMonitoring.monitor('USER', users_list)
    updateSystemDashboard("users",users_list);
    updateUserSelect();
}