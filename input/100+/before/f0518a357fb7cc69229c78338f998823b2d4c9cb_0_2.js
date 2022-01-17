function () {

        xmppchat.connection.xmlInput = function (body) {
            console.log(body);
        };

        xmppchat.connection.xmlOutput = function (body) {
            console.log(body);
        };

        xmppchat.connection.bare_jid = Strophe.getBareJidFromJid(xmppchat.connection.jid);

        xmppchat.roster = xmppchat.Roster(_, $, console);
        xmppchat.rosterview = Backbone.View.extend(xmppchat.RosterView(xmppchat.roster, _, $, console));

        xmppchat.connection.addHandler(xmppchat.roster.presenceHandler, null, 'presence', null);
        
        xmppchat.connection.roster.registerCallback(xmppchat.roster.rosterHandler);
        xmppchat.roster.getRoster();

        xmppchat.chatboxes = new xmppchat.ChatBoxes();
        xmppchat.chatboxesview = new xmppchat.ChatBoxesView({
            'model': xmppchat.chatboxes
        });

        xmppchat.connection.addHandler(
                function (message) { 
                    xmppchat.chatboxesview.messageReceived(message);
                    return true;
                }, 
                null, 'message', 'chat');

        // XMPP Status 
        xmppchat.xmppstatus = new xmppchat.XMPPStatus();
        xmppchat.xmppstatusview = new xmppchat.XMPPStatusView({
            'model': xmppchat.xmppstatus
        });

        xmppchat.xmppstatus.sendPresence();

        // Controlbox toggler
        $toggle.bind('click', function (e) {
            e.preventDefault();
            if ($("div#online-users-container").is(':visible')) {
                xmppchat.chatboxesview.closeChat('online-users-container');
            } else {
                xmppchat.chatboxesview.openChat('online-users-container');
            }
        });
    }