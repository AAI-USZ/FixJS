function(doc) {
        if (doc.type == 'board') {
            var crate = doc.config.snoplus.crate;
            var type = doc.board_type;
            var slot = doc.config.snoplus.slot;
            var db_slot = null;

            // if daughterboard, figure out which db slot
            if (doc._id.substr(0,1).toLowerCase() == 'd') {
                for (var i=0; i<4; i++) {
                    if ('db' in doc.config.snoplus) {
                        if (doc.config.snoplus.db[i].db_id == doc._id) {
                            db_slot = i;
                            break;
                        }
                    }
                }
            }
            emit([String(crate), type, String(slot), String(db_slot)], {id: doc._id, type: doc.board_type, config: doc.config, status: doc.status, location: doc.location});
        }
    }