function(err, offers) {
        if (err || !offers) {
            console.log('fresh links missing', err)
        }
        else {
            console.log('fresh links exist')

            var list = []

            offers.forEach(function (offer) {
                delete offer.href
                list.push(offer)
            });

            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.end('result(' + JSON.stringify({
                success: true
                , total: list.length
                , items: list
            }) + ')');
        }
    }