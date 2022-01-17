function getUser(id) {
    var user;
    $.ajax({
        async: false,
        url: '/users/'+id+'.json',
        dataType: 'json',
        success: function(u) {
            user = u;
        }
    });
    user.full_name = user.first_name+' '+user.last_name;
    return user;
}