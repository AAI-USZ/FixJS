function(group) {
                me.core.addModel('groups', group);
                me.invalidate();
                me.select(group);
            }