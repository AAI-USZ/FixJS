function(source) {
    var user = SESSION.users(source);
    user.print("Abra", "Type /commands to get a list of commands!");
    user.print("blank", "");
}