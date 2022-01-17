function(err, count) {
                        if (err) {
                            cb(err);
                        } else if (count === 0) {
                            cb(null, null);
                        } else {
                            var randomNumber = Math.floor(Math.random() * count);
                            collection.find(
                                {},
                                {
                                    "_id": 1,
                                    "filename": 1
                                },
                                {
                                    limit: 1,
                                    skip: randomNumber
                                }
                            ).nextObject(
                                function(err, doc) {
                                    if (err) {
                                        cb(err);
                                    } else {
                                        collection.remove(
                                            { "_id": doc._id },
                                            function() {
                                                cb(null, doc.filename);
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }