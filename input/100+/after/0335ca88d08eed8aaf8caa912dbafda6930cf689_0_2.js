function (item, finishItemProcessing) {
                    var site = $(item).children('span.site-name').text()
                        , title = $(item).find('h3').attr('title').trim()
                        , link = $('<div />').html($(item).find('h3').children('a').attr('href')).text()

                    console.log('waiting to pakkumised.ee source request', link )

                    request({
                        uri: link
                    }, function (err, response, body) {
                        console.log('counting pakkumised.ee link: ', counter)

                        if (!(err || response.statusCode !== 200) && body) {
                            var $ = cheerio.load(body)
                                , originalUrl = $('<div />').html($('iframe.offerpage_content').attr('src')).text()

                            console.log(originalUrl)

                            if (originalUrl) {
                                console.log('waiting request to original deal', originalUrl)

                                request({
                                    uri: originalUrl,
                                    timeout: 30000
                                }, function (err, response, body) {
                                    counter--;

                                    console.log('counting: ', counter);

                                    if (!(err || response.statusCode !== 200) && body) {
                                        var $ = cheerio.load(body)
                                            , deal = {
                                                url: url.parse(originalUrl)
                                                , site: site
                                            }

                                        var parsedUrl = url.parse(originalUrl);
                                        deal.url = {
                                            href: parsedUrl.href
                                            , host: parsedUrl.host
                                            , hostname: parsedUrl.hostname
                                            , pathname: parsedUrl.pathname
                                        }

                                        _.extend(deal, require(__dirname + '/models/' + site + ".js"))
                                        _.extend(deal, {
                                            parsed: runningTime.getDate() + "/" + runningTime.getMonth() + "/" + runningTime.getYear()
                                        })

                                        db.offers.save(deal, function(err, saved) {
                                            if( err || !saved ) {
                                                console.log("Deal not saved", err);
                                                finishItemProcessing()
                                            }
                                            else {
                                                console.log('Deal saved:', saved);
                                                result.items.push(saved);

                                                if (deal.pictures) {
                                                    console.log('Fetching images:', deal.pictures.length)
                                                    imageProcessor.process(config.images.dir + saved._id + '/', deal.pictures, finishItemProcessing)
                                                }
                                                else {
                                                    finishItemProcessing()
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        console.log('parsing pakkumised.ee link failed', link)
                                        finishItemProcessing()
                                    }
                                });
                            }
                            else {
                                counter--
                                console.log('item has no origin url: ', link)
                                finishItemProcessing()
                            }
                        }
                        else {
                            counter--
                            console.log('parsing pakkumised.ee link finished with error', link, err)
                            finishItemProcessing()
                        }
                    });

                }