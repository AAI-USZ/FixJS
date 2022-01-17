function (err, item) {
                console.log("Scraper.init: Newest timestamp is from " + item.timestamp);
                lastImage = item.image;
                lastAcquire = Date.now();
            }