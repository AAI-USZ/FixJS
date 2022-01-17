function (e) {
            if (e.success) {
            	var acls = e.acls[0];
            	readers.public = acls.public_read || false;
            	readers.ids = acls.readers || [];
            	writers.public = acls.public_write || false;
            	writers.ids = acls.writers || [];
            	alert('Shown!');
            } else {
                error(e);
            }
        }