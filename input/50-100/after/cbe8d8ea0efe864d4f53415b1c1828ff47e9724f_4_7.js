function(name, cb) {
            db.select('permissions', {
                'groups': 'permissions.group_id=groups.id',
                'user_groups': 'groups.id=user_groups.group_id',
                'users': 'user_groups.user_id=users.id'
            }, {
                'permissions.service': 'service',
                'permissions.method': 'method'
            }, 'users.username=?', [name], proxy(cb), null, null, true);
        }