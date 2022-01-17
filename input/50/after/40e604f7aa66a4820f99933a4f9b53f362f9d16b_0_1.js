function (userId){
    var o = map[userId];
    if(o != null && o != undefined){
        return o.sessionId;
    }
    //cprint("Error finding connection to user " + userId);
    return "Null*";
}