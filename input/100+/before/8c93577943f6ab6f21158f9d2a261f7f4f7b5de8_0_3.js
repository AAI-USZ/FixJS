function operator_execute(event){
  var matched = /^operator_(.*)$/.exec($(event.target).closest('a').attr('id'));
  var operation = matched[1];
  var priv = $('#operator_priv').text();
  if (priv.length < 1) {
    show_dialog('Error', 'privilege not selected', {"OK":function(){$('#dialog').dialog('close');}});
    return;
  }
  var path;
  var args;
  if (operation === 'always_allow' || operation === 'default_allow' || operation === 'default_deny' || operation === 'always_deny'){
    path = '/priv/update';
    args = {privilege:priv, dst_type:operation};
  }
  else if (operation === 'allow' || operation === 'deny' || operation === 'remove') {
    var username = $('#operator_user').text();
    if (username.length < 1) {
      show_dialog('Error', 'user not selected', {"OK":function(){$('#dialog').dialog('close');}});
      return;
    }
    path = '/user/update';
    args = {username:username, privilege:priv, operation:operation};
  }
  else {
    show_dialog('Error', 'unknown operation (maybe bug):' + operation, {"OK":function(){$('#dialog').dialog('close');}});
    return;
  }
  $.post(path, args, function(data){
    if (data.result)
      show_dialog('Success', data.message, {"OK":function(){$('#dialog').dialog('close'); reload_page();}});
    else
      show_dialog('Error', data.message, {"OK":function(){$('#dialog').dialog('close');}});
  });
}