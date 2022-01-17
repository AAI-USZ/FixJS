function(groupid,groupname) {
            sakai.api.Groups.getRole(sakai.data.me.user.userid,groupid,function(success,role) {
                sakai.api.Groups.leave(groupid,role,sakai.data.me,function(success) {
                    if (success) {
                        $(window).trigger('lhnav.updateCount', ['memberships', -1]);
                        sakai.api.Util.Modal.close('#mymemberships_delete_membership_dialog');
                        $('#mymemberships_item_'+groupid).fadeOut(false, function() {
                            // Show the default message if I have no remaining memberships
                            if ($('#mymemberships_items li:visible').length === 0) {
                                render({
                                    entry: []
                                });
                            }
                        });
                        sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('MY_MEMBERSHIPS','mymemberships'),
                            sakai.api.i18n.getValueForKey('YOU_HAVE_LEFT_GROUP','mymemberships').replace('${groupname}',groupname),
                            sakai.api.Util.notification.type.INFORMATION);
                    } else {
                        sakai.api.Util.Modal.close('#mymemberships_delete_membership_dialog');
                        sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('MY_MEMBERSHIPS','mymemberships'),
                            sakai.api.i18n.getValueForKey('ERROR_LEAVING_GROUP','mymemberships').replace('${groupname}',groupname),
                            sakai.api.Util.notification.type.ERROR);
                    }
                });
            });
        }