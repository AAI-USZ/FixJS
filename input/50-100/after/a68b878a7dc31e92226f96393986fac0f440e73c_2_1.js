function (e) {
            if (e.success) {
            	var acls = e.acls[0];
            	readers.publicAccess = acls.public_read || false;
            	readers.ids = acls.readers || [];
            	writers.publicAccess = acls.public_write || false;
            	writers.ids = acls.writers || [];
            	alert('Shown!');
            } else {
                error(e);
            }
        }