function(err, res) {
                    if (err) return error(err);
                    var data = [];
                    _.each(res.rows, function(val) {
                        data.push(val.doc);
                    });
                    success(data);
                }