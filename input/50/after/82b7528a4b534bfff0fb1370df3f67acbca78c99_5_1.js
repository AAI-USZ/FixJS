function(doc) {
        if (doc.config && doc.type != 'board') {
            doc.config.db.forEach(
                function(db) {
                    emit(db.db_id, 1);
                }
            );
        }
    }