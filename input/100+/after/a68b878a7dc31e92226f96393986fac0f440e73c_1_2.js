function (e) {
            if (e.success) {
                if (e.users.length == 0) {
                    table.setData([
                        { title: 'No Users!' }
                    ]);
                }
                else {
                    var data = [];
                    if (typeof access.publicAccess != 'undefined') {
                    	data.push({ title: '<Public Access>', id: 'publicAccess', hasCheck: access.publicAccess || false });
                    }    
                    for (var i = 0, l = e.users.length; i < l; i++) {
                        var user = e.users[i];
                        var row = Ti.UI.createTableViewRow({
                            title: user.first_name + ' ' + user.last_name,
                            id: user.id
                        });
                        row.hasCheck = access.ids.indexOf(user.id) != -1;
                        data.push(row);
                    }
                    table.setData(data);
                }
            }
            else {
                table.setData([
                    { title: (e.error && e.message) || e }
                ]);
                error(e);
            }
        }