function(ev) {
                var $el = $(this);
                var groupid = $el.attr('data-groupid');
                if (groupid) {
                    sakai.api.Groups.isAllowedToLeave(groupid, sakai.data.me, function(leaveAllowed) {
                        openTooltip(groupid, $el, leaveAllowed[groupid]);
                    });
                }
                return false;
            }