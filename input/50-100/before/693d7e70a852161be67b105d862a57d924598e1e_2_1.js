function (err) {
                if (err) {
                    if (err.code === 'EACCES') {
                        console.log("Must be root, try: sudo jslint --update");
                        process.exit(1);
                    }
                    throw err;
                }
                cb();
            }