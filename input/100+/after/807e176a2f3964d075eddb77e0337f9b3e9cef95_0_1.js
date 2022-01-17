function(err, offers) {
        res.writeHead(200, { 'Content-Type': 'text/javascript' })

        if (err || !offers) {
            console.log('fresh links missing', err)
            res.end('result(' + JSON.stringify({
                success: false
                , message: 'No fresh offers found'
            }) + ')');
        }
        else {
            console.log('fresh links exist')
            var list = []

            offers.forEach(function (offer) {
                delete offer.href
                list.push(offer)
            });

            res.end('result(' + JSON.stringify({
                success: true
                , total: list.length
                , items: list
            }) + ')');
        }
    }