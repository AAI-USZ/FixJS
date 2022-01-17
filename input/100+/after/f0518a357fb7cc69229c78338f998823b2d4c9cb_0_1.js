function (presence) {
        var jid = $(presence).attr('from'),
            bare_jid = Strophe.getBareJidFromJid(jid),
            resource = Strophe.getResourceFromJid(jid),
            ptype = $(presence).attr('type'),
            item,
            status = '';

        if (($(presence).find('x').attr('xmlns') || '').indexOf(Strophe.NS.MUC) === 0) {
            // We don't take kindly to MUC stanzas around these here parts 
            return true;
        } else if ((ob.isSelf(bare_jid)) || (ptype === 'error')) { 
            return true; 
        } else if ((ptype === 'subscribed') || (ptype === 'unsubscribe')) {
            return true;
        }

        if (ptype === 'subscribe') {
            if (ob.getItem(bare_jid)) { 
                xmppchat.connection.roster.authorize(bare_jid);
            } else {
                ob.addRosterItem(bare_jid, 'none', 'request');
            }
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
        } else { 
            // Presence has changed
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