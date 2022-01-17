function(err, data) {
                if (err) return next(err);

                resolved.Stylesheet[index] = {
                    id: s,
                    data: data
                };
                next(err);
                localizeCartoURIs(resolved.Stylesheet[index]);
            }