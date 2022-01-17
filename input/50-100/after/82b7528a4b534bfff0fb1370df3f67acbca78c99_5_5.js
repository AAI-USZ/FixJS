function (doc) {
        if (doc.type == 'ecal') {
            emit([doc._id, 0], doc);
        }
        else if (doc.ecal_id) {
            var d = {
                _id: doc._id,
                type: doc.type,
                pass: doc.pass,
                created: doc.created,
                config: doc.config
            };
            emit([doc.ecal_id, 1], d);
        }
    }