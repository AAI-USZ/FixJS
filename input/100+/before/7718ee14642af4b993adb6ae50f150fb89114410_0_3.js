function (presence) {
        var jid = $(presence).attr('from'),
            bare_jid = Strophe.getBareJidFromJid(jid),
            resource = Strophe.getResourceFromJid(jid),
            ptype = $(presence).attr('type'),
            status = '';

        if (ptype === 'subscribe') {
            // User wants to subscribe to us. Always approve and
            // ask to subscribe to him
            xmppchat.Roster.authorize(bare_jid);
            xmppchat.Roster.subscribe(bare_jid);

        } else if (ptype === 'unsubscribe') {
            if (_.indexOf(xmppchat.Roster.getCachedJids(), bare_jid) != -1) {
                xmppchat.Roster.unauthorize(bare_jid);
                xmppchat.Roster.unsubscribe(bare_jid);
                $(document).trigger('jarnxmpp.presence', [jid, 'unsubscribe', presence]);
            }

        } else if (ptype === 'unsubscribed') {
            return;

        } else if (ptype !== 'error') { // Presence has changed
            if (ptype === 'unavailable') {
                status = 'unavailable';
            } else if (ptype === 'offline') {
                status = 'offline';
            } else if (ptype === 'busy') {
                status = 'busy';
            } else if (ptype === 'away') {
                status = 'away';
            } else {
                status = ($(presence).find('show').text() === '') ? 'online' : 'away';
            }

            if ((status !== 'offline')&&(status !== 'unavailable')) {
                xmppchat.ChatPartners.add(bare_jid, resource);
                $(document).trigger('jarnxmpp.presence', [jid, status, presence]);
            } else {
                if (xmppchat.ChatPartners.remove(bare_jid, resource) === 0) {
                    // Only notify offline/unavailable if there aren't any other resources for that user
                    $(document).trigger('jarnxmpp.presence', [jid, status, presence]);
                }
            }
        }
        return true;
    }