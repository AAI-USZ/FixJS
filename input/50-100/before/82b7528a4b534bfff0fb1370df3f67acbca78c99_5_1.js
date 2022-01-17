function(doc) {
        if(doc.config && doc.type != 'board') {
            var c = new Date(doc.created);
            var created = -c.getTime();
            emit([doc.config.fec_id, created], {'type': doc.type, 'pass': doc.pass, 'created': doc.created, 'config': doc.config, 'archived': doc.archived});
        }
    }