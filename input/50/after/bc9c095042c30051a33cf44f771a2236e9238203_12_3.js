function(leaveAllowed) {
                        $.each(leaveAllowed, function(groupid, canLeave) {
                            if (!canLeave) {
                                $('.mymemberships_leave[data-sakai-entityid="' + groupid + '"]').addClass('mymemberhips_disabled_leave');
                            }
                        });
                    }