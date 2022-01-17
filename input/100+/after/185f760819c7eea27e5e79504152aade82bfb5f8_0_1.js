function(data){
                        enableDisableInviteButton(false);
                        sakai.api.Util.Modal.close(addToContactsDialog);
                        sakai.api.Communication.sendMessage(userid, sakai.data.me, title, message, "invitation", false,false,true,"contact_invitation");
                        $(window).trigger("sakai.addToContacts.requested", [contactToAdd]);
                        //reset the form to set original note
                        $(addToContactsForm)[0].reset();
                        var notificationMessage = contactToAdd.displayName + ' ' + sakai.api.i18n.getValueForKey('HAS_BEEN_ADDED_TO_YOUR_CONTACTS_LIST', 'addtocontacts');
                        sakai.api.Util.notification.show('', notificationMessage);
                    }