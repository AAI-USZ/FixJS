function (evt) {
        if (evt.row.id) {
            if (evt.row.isMyID)
                return;
            evt.row.hasCheck = !evt.row.hasCheck;
            checked[evt.row.id] = evt.row.hasCheck;
            if (!evt.row.hasCheck) {
                delete checked[evt.row.id];
            }
        }
        else {
            var ids = [];
            for (var id in checked) {
                if (!checked.hasOwnProperty(id)) {
                    continue;
                }
                ids.push(id);
            }
            if (ids.length) {
                handleOpenWindow({ target: 'Show Chat Group', ids: ids });
            } else {
                alert('Please check at least one user!');
            }
        }
    }