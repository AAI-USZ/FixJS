function (ev) {
        var that = this;
        ev.preventDefault();
        $("<span></span>").dialog({
            title: 'Are you sure you want to remove this contact?',
            dialogClass: 'remove-xmpp-contact-dialog',
            resizable: false,
            width: 400,
            modal: true,
            buttons: {
                "Yes, remove.": function() {
                    $( this ).dialog( "close" );
                    var jid = $(that).parent().attr('data-recipient');
                    xmppchat.Roster.unsubscribe(jid);
                },
                "Cancel": function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    }