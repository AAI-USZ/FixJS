function (evt) {
        if (evt.row.id) {
            evt.row.hasCheck = !evt.row.hasCheck;
            if (evt.row.id === 'publicAccess') {
            	access.publicAccess = evt.row.hasCheck;
            } else if (evt.row.hasCheck) {
            	access.ids.push(evt.row.id);
            } else {
            	access.ids.splice(access.ids.indexOf(evt.row.id),1);
            }
        }
    }