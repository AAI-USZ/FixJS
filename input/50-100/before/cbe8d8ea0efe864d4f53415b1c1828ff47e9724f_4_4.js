function(item) {
                        db.insert('permissions', {
                            service: item.service,
                            group_id: result.id,
                            method: item.method
                        }, function(err) {
                            if (err) errors.push(err);
                            callback(errors.length > 0 ? errors : null, errors.length == 0);
                        });
                    }