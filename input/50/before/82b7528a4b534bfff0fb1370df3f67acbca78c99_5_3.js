function(doc) {
        if (doc.type == 'tag')
          emit(doc.board,[doc.created,doc.status,1]);
    }