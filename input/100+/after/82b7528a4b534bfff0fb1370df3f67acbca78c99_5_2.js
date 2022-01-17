function(doc) {
        if (doc.config && doc.type != 'board') {
            doc.config.db.forEach(
                function(db) {
                    var created = -(new Date(doc.created)).getTime();
                    var d = {
                        type: doc.type,
                        pass: doc.pass,
                        created: doc.created,
                        config: doc.config,
                        archived: doc.archived
                     };
                    emit([db.db_id, created], d);
                }
            );
        }
    }