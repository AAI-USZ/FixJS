function (results, callback){
            var participantsArr = [];
            if (results && results.length){
                sakai.api.User.getContacts(function() {
                    $.each(results, function(i, result){
                        if(result["sakai:group-id"] || result["rep:userId"]){
                            var contentCount = 0;
                            var contactsCount = 0;
                            var membershipsCount = 0;
                            if (result.counts){
                                contentCount = result.counts.contentCount;
                                contactsCount = result.counts.contactsCount;
                                membershipsCount = result.counts.membershipsCount;
                            }
                            var picture = false;
                            var roleTitle = getRoleTitle(result);
                            if (result["sakai:group-id"]) {
                                if(result.basic.elements.picture && result.basic.elements.picture.value){
                                    picture = sakai.api.Groups.getProfilePicture(result);
                                }
                                participantsArr.push({
                                    "name": result["sakai:group-title"],
                                    "id": result["sakai:group-id"],
                                    "title": roleTitle,
                                    "type": "group",
                                    "connected": false,
                                    "content": contentCount,
                                    "contacts": contactsCount,
                                    "memberships": membershipsCount,
                                    "profilePicture": picture,
                                    "membersCount": result.counts.membersCount
                                });
                            } else {
                                // Check if this user is a friend of us already.
                                var connected = false, invited = false, pending = false, none = false;
                                if (sakai.data.me.mycontacts) {
                                    $.each(sakai.data.me.mycontacts, function(ii, contact){
                                        if (contact.target === result["rep:userId"]) {
                                            connected = true;
                                            // if invited state set invited to true
                                            if(contact.details["sakai:state"] === "INVITED"){
                                                invited = true;
                                            } else if(contact.details["sakai:state"] === "PENDING"){
                                                pending = true;
                                            } else if(contact.details["sakai:state"] === "NONE"){
                                                none = true;
                                            }
                                        }
                                    });
                                }
                                if(result.basic.elements.picture && result.basic.elements.picture.value){
                                    picture = sakai.api.User.getProfilePicture(result);
                                }
                                participantsArr.push({
                                    "name": sakai.api.User.getDisplayName(result),
                                    "id": result["rep:userId"],
                                    "title": roleTitle,
                                    "type": "user",
                                    "content": contentCount,
                                    "contacts": contactsCount,
                                    "memberships": membershipsCount,
                                    "connected": connected,
                                    "invited": invited,
                                    "pending": pending,
                                    "none": none,
                                    "profilePicture": picture
                                });
                            }
                        }
                    });
                });
            }
            callback(participantsArr);
        }