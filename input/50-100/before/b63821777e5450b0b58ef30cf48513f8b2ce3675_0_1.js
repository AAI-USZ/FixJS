function(err, data) {
                    if (err) return next(err);

                    resolved.Stylesheet[index] = {
                        id: path.basename(uri.pathname),
                        data: data.toString()
                    };
                    next(err);
                }