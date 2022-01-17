function(evObj, groupid, target){
                sakai.api.Groups.isAllowedToLeave(groupid, sakai.data.me, function(leaveAllowed){
                    openTooltip(groupid, $(target), leaveAllowed[groupid]);
                });
                return false;
            }