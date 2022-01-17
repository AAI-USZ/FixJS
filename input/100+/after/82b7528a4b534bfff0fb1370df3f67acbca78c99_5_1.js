function(doc) {
        if (doc.config && doc.type != 'board') {
            var created = -(new Date(doc.created)).getTime();
            var d = {
                type: doc.type,
                pass: doc.pass,
                created: doc.created,
                config: doc.config,
                archived: doc.archived
            };
            emit([{"crate": doc.config.crate_id, "slot": doc.config.slot}, created], d);
        }
    }