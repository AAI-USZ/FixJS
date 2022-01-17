function (evt) {
        Cloud.ACLs.update({
            name: name.value,
            reader_ids: readers.ids.join(','),
            writer_ids: writers.ids.join(','),
            public_read: readers.publicAccess,
            public_write: writers.publicAccess
        }, function (e) {
            if (e.success) {
                alert('Updated!');
            } else {
                error(e);
            }
         });
    }