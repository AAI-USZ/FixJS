function(roomId) {
    var html = '<div id="emailBody"><ul style="list-style:none;margin:0px;padding:0px;width:650px;">';
    var messages = Messages.find({roomId:roomId});
    console.log(messages);
    for(message in messages) {
        html += '<li class="' + message.role + '" style="border-bottom:1px solid #CCC;padding:4px;">';
        if (message.role == 'host') {
            html += '<span style="color: #29642a;">';
        }
        html += '<strong>' + message.user + '</strong> <em>(' + message.timestamp + ')</em></span>: ' + message.content + '</li>';
    }

    html += '</ul></div>';

    return html;
}