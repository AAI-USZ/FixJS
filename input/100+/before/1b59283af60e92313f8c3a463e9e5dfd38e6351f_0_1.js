function(data){
                        enableDisableInviteButton(false);
                        sakai.api.Util.Modal.close(addToContactsDialog);
                        sakai.api.Communication.sendMessage(userid, sakai.data.me, title, message, "invitation", false,false,true,"contact_invitation");
                        $(window).trigger("sakai.addToContacts.requested", [contactToAdd]);
                        //reset the form to set original note
                        $(addToContactsForm)[0].reset();
                        sakai.api.Util.notification.show("", $(addToContactsDone, $rootel).html());
                    }