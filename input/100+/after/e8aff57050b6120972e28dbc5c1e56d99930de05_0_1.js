function hostSubmitChat() {
    var roomId = Session.get('roomId');
    var content = $('#input').val();
    console.log('Input Value: ' + content);
    var d = new Date();
    var messagetime = d.getTime();
    var date = d.toDateString() + " " + d.toLocaleTimeString();
    if(content.length > 0)
    {
        Messages.insert({roomId: roomId , content: content, user: getUser(),role:role,messagetime:messagetime ,date:date,archived:null});
        if(false) {
            Hosts.update({_id:roomId},{$set: { unread:0 }});
        } else if (false) {
            var data = Rooms.findOne({_id:roomId});
            if(data) {
                var count = data.unread;
                count++;
                Hosts.update({_id:roomId},{$set:{unread:count}});
            }
        }
    }
    $('#input').val('');
    $('#input').focus();
}