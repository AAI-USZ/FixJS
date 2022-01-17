function add_features(err, x) {
            if (err && callback) return callback(err);
            if (x && x.features) m.features(x.features);
            if (callback) callback(err, x.features, m);
        }