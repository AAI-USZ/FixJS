function() {
            if (pubdata && pubdata.structure0) {
                if (contextData && contextData.profile && contextData.profile.counts) {
                    addCount(pubdata, "library", contextData.profile.counts["contentCount"]);
                    addCount(pubdata, "memberships", contextData.profile.counts["membershipsCount"]);
                    if (isMe) {
                        var contactCount = 0;
                        // determine the count of contacts to list in lhnav
                        if (sakai.data.me.contacts.accepted && sakai.data.me.contacts.invited) {
                            contactCount = sakai.data.me.contacts.accepted + sakai.data.me.contacts.invited;
                        } else if (sakai.data.me.contacts.accepted) {
                            contactCount = sakai.data.me.contacts.accepted;
                        } else if (sakai.data.me.contacts.invited) {
                            contactCount = sakai.data.me.contacts.invited;
                        }
                        addCount(pubdata, "contacts", contactCount);
                        addCount(privdata, "messages", sakai.data.me.messages.unread);
                        if (messageCounts && messageCounts.count && messageCounts.count.length) {
                            for (var i = 0; i < messageCounts.count.length; i++) {
                                if (messageCounts.count[i].group && messageCounts.count[i].group === "message") {
                                    addCount(privdata, "messages/inbox", messageCounts.count[i].count);
                                }
                                if (messageCounts.count[i].group && messageCounts.count[i].group === "invitation") {
                                    addCount(privdata, "messages/invitations", messageCounts.count[i].count);
                                }
                            }
                        }
                    } else {
                        addCount(pubdata, "contacts", contextData.profile.counts["contactsCount"]);
                    }
                }
            }
        }