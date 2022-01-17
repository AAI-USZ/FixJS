function(i, from) {
                var user = users[from];
                if(_.isBoolean(user)===true || user === undefined) {
                    return;
                }
                that._updateGroup(user, span);
            }