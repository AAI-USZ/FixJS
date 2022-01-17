function(m, err) {
                if (!error) error = err;
                model.error = err;
                if (--remaining === 0) callback(error, models);
            }