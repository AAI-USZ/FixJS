function(err, data) {
            // By default:
            //   compression = 8
            //   encoding = utf8
            if (err) {
                callback(null, err);
				return;
            }
            out.write(data);
            out.end();
        }