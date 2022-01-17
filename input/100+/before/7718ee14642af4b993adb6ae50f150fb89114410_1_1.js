function (user_id, bare_jid, fullname) {
        if ($('#online-users-' + user_id).length > 0) { return; }
        var li = $('<li></li>').attr('id', 'online-users-'+user_id).attr('data-recipient', bare_jid);
        li.append($('<a title="Click to chat with this contact"></a>').addClass('user-details-toggle').text(fullname));
        li.append($('<a title="Click to remove this contact" href="#"></a>').addClass('remove-xmpp-contact'));
        $('#xmpp-contacts').append(li);
    }