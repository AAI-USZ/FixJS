function popUpCreateAclDialog(){
    var users = $('<select>'+users_select+'</select>');
    $('.empty_value',users).remove();
    $('option',users).addClass("user");
    users.prepend('<option value="">---'+tr("Users")+'---</option>');

    var groups = $('<select>'+groups_select+'</select>');
    $('.empty_value',groups).remove();
    $('option',groups).addClass("group");
    groups.prepend('<option value="">---'+tr("Groups")+'---</option>');

    var dialog =  $create_acl_dialog;
    $('#applies',dialog).html('<option value="*">'+tr("All")+'</option>'+
                                          users.html()+groups.html());
    $('#belonging_to',dialog).html(groups_select);

    $('#applies',dialog).trigger("change");
    dialog.dialog('open');
}