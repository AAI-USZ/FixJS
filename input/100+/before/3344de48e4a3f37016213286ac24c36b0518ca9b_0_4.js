function () {
        // Messages
        xmppchat.connection.addHandler(xmppchat.Messages.messageReceived, null, 'message', 'chat');
        xmppchat.UI.restoreOpenChats();

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
    }