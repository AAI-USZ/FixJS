function(err, data) {
            // By default:
            //   compression = 8
            //   encoding = utf8
            if (err) {
                throw err;
            }
            out.write(data);
            out.end();
        }