function (ev) {
        var that = this;
        ev.preventDefault();
        $("<span></span>").dialog({
            title: 'Are you sure you want to remove this contact?',
            dialogClass: 'remove-xmpp-contact-dialog',
            resizable: false,
            width: 200,
            position: {
                my: 'center',
                at: 'center',
                of: '#online-users-container'
                },
            modal: true,
            buttons: {
                "Remove": function() {
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