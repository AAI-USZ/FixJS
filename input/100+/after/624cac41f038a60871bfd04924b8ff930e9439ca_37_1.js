function(i, result) {
                    if(result['sakai:group-id'] || result['rep:userId']) {
                        var contentCount = 0;
                        var contactsCount = 0;
                        var membershipsCount = 0;
                        if (result.counts) {
                            contentCount = result.counts.contentCount;
                            contactsCount = result.counts.contactsCount;
                            membershipsCount = result.counts.membershipsCount;
                        }
                        var picture = false;
                        var roleTitle = getRoleTitle(result);
                        if (result['sakai:group-id']) {
                            if (result.basic.elements.picture && result.basic.elements.picture.value) {
                                picture = sakai.api.Groups.getProfilePicture(result);
                            }
                            participantsArr.push({
                                'name': result['sakai:group-title'],
                                'id': result['sakai:group-id'],
                                'title': roleTitle,
                                'type': 'group',
                                'connected': false,
                                'content': contentCount,
                                'contacts': contactsCount,
                                'memberships': membershipsCount,
                                'profilePicture': picture,
                                'membersCount': result.counts.membersCount
                            });
                        } else {
                            // Check if this user is a friend of us already.
                            var connected = false;
                            var invited = false;
                            var pending = false;
                            var none = false;
                            if (result['sakai:state'] === 'ACCEPTED') {
                                connected = true;
                            } else if (result['sakai:state'] === 'INVITED') {
                                connected = true;
                                invited = true;
                            } else if (result['sakai:state'] === 'PENDING') {
                                connected = true;
                                pending = true;
                            } else if (result['sakai:state'] === 'NONE') {
                                none = true;
                            }

                            if (result.basic.elements.picture && result.basic.elements.picture.value) {
                                picture = sakai.api.User.getProfilePicture(result);
                            }
                            participantsArr.push({
                                'name': sakai.api.User.getDisplayName(result),
                                'id': result['rep:userId'],
                                'title': roleTitle,
                                'type': 'user',
                                'content': contentCount,
                                'contacts': contactsCount,
                                'memberships': membershipsCount,
                                'connected': connected,
                                'invited': invited,
                                'pending': pending,
                                'none': none,
                                'profilePicture': picture
                            });
                        }
                    }
                }