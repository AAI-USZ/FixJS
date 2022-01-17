function(err, doc) {
                    if (err) {
                        error(err);
                    } else if (doc._rev !== model.get('_rev')) {
                        // Create a fake object; we already know that sending
                        // the request would fail.
                        var err = new Error('Document update conflict.');
                        err.reason = 'Document update conflict.';
                        err.statusCode = 409;
                        error(error);
                    } else {
                        db.put(_(doc).extend(toJSON(model)), function(err, res) {
                            if (err) return error(err);
                            success({'_rev': res.rev});
                        });
                    }
                }