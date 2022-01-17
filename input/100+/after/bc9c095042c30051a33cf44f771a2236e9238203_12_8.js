function() {
                if ($(this).hasClass('mymemberhips_disabled_leave')) {
                    sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('GROUP_MEMBERSHIP'),
                        sakai.api.i18n.getValueForKey('UNABLE_TO_LEAVE', 'mymemberships').replace('${groupname}', $(this).attr('data-sakai-entityname')),
                        sakai.api.Util.notification.type.ERROR);
                } else {
                    var msg = sakai.api.i18n.getValueForKey('ARE_YOU_SURE_YOU_WANT_TO_LEAVE', 'mymemberships').replace('${groupname}', '<span class="s3d-bold">' + $(this).data('sakai-entityname') + '</span>');
                    $('#mymemberships_are_you_sure').html(msg);
                    $('#mymemberships_delete_membership_confirm').attr('data-sakai-entityid', $(this).attr('data-sakai-entityid'));
                    $('#mymemberships_delete_membership_confirm').attr('data-sakai-entityname', $(this).attr('data-sakai-entityname'));
                    sakai.api.Util.Modal.open('#mymemberships_delete_membership_dialog');
                }
            }