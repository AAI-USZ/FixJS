function(doc) {
        if (doc.config && doc.type != 'board') {
            emit(doc.type, 1);
        }
    }