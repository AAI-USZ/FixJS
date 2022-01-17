function(params) {
    var user = params.user;
    //user.print("blank","");
    user.print("***", "Commands");
    user.print("blank","");

    for(var command in commands) {
        user.print("/"+command, commands[command][0]);
    }

    user.print("blank", "");
}