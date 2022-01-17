function(geonameResult, response){

        console.log('Status Code: ' + response.statusCode);

        if (geonameResult instanceof Error) {

            console.log('Error: ' + geonameResult.message);

        } else {

            console.log('result: ' + geonameResult);

            var parser = new xml2js.Parser();

            var countyName = '';

            parser.parseString(geonameResult, function (err, parseResult){
                countyName = parseResult.countrySubdivision.adminName2;
            });
            
            console.log('County Name: ' + countyName);
            
            var target = lookupData[countyName];

            if ( target != '' && target != undefined ) {
                console.log('TRAVEL API REQUEST:  http://www.bbc.co.uk' + target + '.json');
                //res.redirect('http://www.bbc.co.uk' + target + '.json');

                var travelRequest = restler.get('http://www.bbc.co.uk' + target + '.json');

                travelRequest.on('complete', function(travelResult, response){

                    console.log('Status Code: ' + response.statusCode);

                    if (travelResult instanceof Error) {

                        console.log('Error: ' + travelResult.message);

                    } else {

                        console.log('result: ' + geonameResult);

                        res.json(travelResult);

                    }

                });

            } else {
                console.log('County (' + countyName + ') not mapped');
                res.send(404);
            }
        }

    }