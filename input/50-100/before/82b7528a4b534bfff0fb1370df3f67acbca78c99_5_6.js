function(doc) {
        if(doc.type == 'tag')
            emit(doc.board, 1);
    }