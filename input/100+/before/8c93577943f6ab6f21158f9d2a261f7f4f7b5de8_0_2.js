function checker_execute(){
  var username = $('#checker_username').val();
  var privilege = $('#checker_privilege').val();
  if (username.length < 1 || privilege.length < 1) {
    show_dialog('Error', 'blank username or password', {"OK":function(){$('#dialog').dialog('close');}});
    return;
  }
  $.get('/check?' + (new Date()).getTime(), {username:username, privilege:privilege}, function(data){
    show_dialog('Checker result', data['result'], {"OK":function(){$('#dialog').dialog('close');}});
  });
}