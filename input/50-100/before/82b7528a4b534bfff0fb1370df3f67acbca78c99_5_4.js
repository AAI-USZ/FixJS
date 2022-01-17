function (doc) {
        if(doc.config && doc.type != 'board')
            if(doc.type == 'final_test')
                emit([doc._id, 0], doc);
            else if(doc.final_test_id)
                emit([doc.final_test_id, 1], doc);
    }