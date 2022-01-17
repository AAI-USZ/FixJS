function (result) {
                res.send(200, encodeURIComponent(JSON.stringify({
                    code: 1,
                    data: result
                })));
            }