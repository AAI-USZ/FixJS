function (err, data) {
                if (err) {
                    if (typeof handler === 'function') {
                        handler(err);
                    }
                } else {
                    fs.writeFile(that.fileName, JSON.stringify(data).slice(1, -1) + ',', handler);
                }
            }