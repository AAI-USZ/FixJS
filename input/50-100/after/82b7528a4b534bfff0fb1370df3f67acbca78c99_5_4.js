function(doc) {
        if (doc.config && doc.type != 'board') {
            emit(doc.config.fec_id, 1);
        }
    }