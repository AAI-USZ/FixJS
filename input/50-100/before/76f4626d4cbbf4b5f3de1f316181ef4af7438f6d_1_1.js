function (err, data) {
                if (typeof handler === 'function') {
                    handler(err, JSON.parse('{' + data.toString().slice(0, -1) + '}'));
                }
            }