function () {
        // FIXME: Need to get some convention going for naming classes and instances of
        // models and views.

        // Messages
        xmppchat.connection.addHandler(xmppchat.Messages.messageReceived, null, 'message', 'chat');
        xmppchat.Roster = xmppchat.RosterClass(Strophe._connectionPlugins.roster, _, $, console);
        xmppchat.rosterview = Backbone.View.extend(xmppchat.RosterView(xmppchat.Roster, _, $, console));

        xmppchat.connection.addHandler(xmppchat.Roster.presenceHandler, null, 'presence', null);
        
        xmppchat.Roster.registerCallback(xmppchat.Roster.updateHandler);
        xmppchat.Roster.getRoster();
        xmppchat.Presence.sendPresence();

        xmppchat.chatboxes = new xmppchat.ChatBoxes();
        
        xmppchat.chatboxesview = new xmppchat.ChatBoxesView({
            'model': xmppchat.chatboxes
        });

        $toggle.bind('click', function (e) {
            e.preventDefault();
            if ($("div#online-users-container").is(':visible')) {
                xmppchat.chatboxesview.closeChat('online-users-container');
            } else {
                xmppchat.chatboxesview.openChat('online-users-container');
            }
        });
    }