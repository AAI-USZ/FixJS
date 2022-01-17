function (doc) {
        if (doc.type == 'board')
            emit([doc._id, 0], doc);
        else if(doc.type == 'final_test') {
            emit([doc.config.fec_id, 1], doc);
            emit([doc.config.db[0].db_id, 1], doc);
            emit([doc.config.db[1].db_id, 1], doc);
            emit([doc.config.db[2].db_id, 1], doc);
            emit([doc.config.db[3].db_id, 1], doc);
        }
        else if (doc.type == 'ecal') {
            for (crate in doc.crates) {
                for (slot in doc.crates[crate].slots) {
                    var s = doc.crates[crate].slots[slot];
                    emit([s.mb_id, 2], doc);
                    emit([s.db0_id, 2], doc);
                    emit([s.db1_id, 2], doc);
                    emit([s.db2_id, 2], doc);
                    emit([s.db3_id, 2], doc);
                }
            }
        }
        else if (doc.name == 'FEC') {
            emit([doc.board_id, 3], doc);
            emit([doc.id.hv, 3], doc);
            emit([doc.id.db0, 3], doc);
            emit([doc.id.db1, 3], doc);
            emit([doc.id.db2, 3], doc);
            emit([doc.id.db3, 3], doc);
        }
        else if(doc.type == 'tag') {
            var c = new Date(doc.created);
            var created = -c.getTime();
            doc.board = doc.board.toLowerCase();
            if (doc.board.substring(0,1) == 'm') {
                doc.board = 'f' + doc.board.substring(1,doc.board.length);
            }
            emit([doc.board, 4], doc);
        }
    }