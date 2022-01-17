function (err) {
                if (err) {
                    if (err.code === 'EACCES') {
                        console.log("Must be root");
                        console.log("Try:\n\tsudo jslint --update");
                        process.exit(1);
                    }
                    throw err;
                }
                cb();
            }