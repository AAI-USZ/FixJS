function(data) {
        var messages = data.messages;
        username = data.username;        
        var $output = $message_list_element;
        if (messages instanceof Array) {
            if (messages.length === 0) {
                $output.html('<p>No messages available.</p>');
            } else {
                var $ul = $('<ul/>');
                for(var i=0; i< messages.length; i++) {
                    var msg = messages[i].Message; // or use label value
                    var lockkeeper = messages[i].Lockkeeper.username;
                    var escaped_text = $('<div/>').text(msg.message).html();
                    var tag = (!msg.tag || msg.tag === 'null')? '&nbsp;' : msg.tag;
                    tag = $('<span class="msg-tag"/>').html(tag);
                    var radio = $('<input type="radio"/>').attr({
                        'id': 'mm_text_' + msg.id,
                        'name': 'mm_text',
                        'value': escaped_text
                    }).wrap('<p/>').parent().html();
                    var label = $('<label/>', {
                        'class': 'msg-text',
                        'for': 'mm_text_' + msg.id
                    }).text(escaped_text).wrap('<p/>').parent().html();
                    var p = $('<p/>').append(tag).append(radio).append(label);
                    var litem = $('<li id="' + msg_prefix + msg.id + '" class="mm-msg">').append(p);
                    if (lockkeeper) {
                        litem.addClass(lockkeeper == username? 'msg-is-owned' : 'msg-is-locked'); 
                    }
                    $ul.append(litem);
                }
                $output.empty().append($ul);
            }
        } else {
            $output.html('<p>No messages (server did not send a list).</p>');
        }
    }