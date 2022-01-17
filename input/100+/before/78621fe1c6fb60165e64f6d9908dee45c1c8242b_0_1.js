function (evt) {
    	if (name.value.length == 0) {
    		name.focus();
    		return;
    	}
    	createButton.hide();
        Cloud.ACLs.create({
            name: name.value,
            reader_ids: readers.ids.join(','),
            writer_ids: writers.ids.join(','),
            public_read: readers.public,
            public_write: writers.public
        }, function (e) {
            if (e.success) {
                alert('Created!');
            } else {
                error(e);
            }
            createButton.show();
        });
    }