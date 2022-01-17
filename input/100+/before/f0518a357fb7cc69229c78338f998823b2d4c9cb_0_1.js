function (presence) {
        var jid = $(presence).attr('from'),
            bare_jid = Strophe.getBareJidFromJid(jid),
            resource = Strophe.getResourceFromJid(jid),
            ptype = $(presence).attr('type'),
            item,
            status = '';

        if (ob.isSelf(bare_jid)) { 
            return true; 
        }
        if (ptype === 'subscribe') {
            if (ob.getItem(bare_jid)) { 
                xmppchat.connection.roster.authorize(bare_jid);
            } else {
                ob.addRosterItem(bare_jid, 'none', 'request');
            }
        } else if (ptype === 'subscribed') {
            return true;
        } else if (ptype === 'unsubscribe') {
            return true;
        } else if (ptype === 'unsubscribed') {
            /* Upon receiving the presence stanza of type "unsubscribed", 
             * the user SHOULD acknowledge receipt of that subscription state 
             * notification by sending a presence stanza of type "unsubscribe" 
             * this step lets the user's server know that it MUST no longer 
             * send notification of the subscription state change to the user.
             */
            xmppchat.xmppstatus.sendPresence('unsubscribe');
            if (xmppchat.connection.roster.findItem(bare_jid)) {
                xmppchat.roster.remove(bare_jid);
                xmppchat.connection.roster.remove(bare_jid);
            }
            return true;
        } else if (ptype === 'error') {
            return true;

        } else if (ptype !== 'error') { // Presence has changed
            if (_.indexOf(['unavailable', 'offline', 'busy', 'away'], ptype) != -1) {
                status = ptype;
            } else {
                status = ($(presence).find('show').text() === '') ? 'online' : 'away';
            }
            if ((status !== 'offline')&&(status !== 'unavailable')) {
                ob.addResource(bare_jid, resource);
                model = ob.getItem(bare_jid);
                model.set({'status': status});
            } else {
                if (ob.removeResource(bare_jid, resource) === 0) {
                    model = ob.getItem(bare_jid);
                    model.set({'status': status});
                }
            }
        }
        return true;
    }