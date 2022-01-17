f        {
            var bounds = _this.mainMap.getBounds();

            var since_time = Math.floor(((new Date()).getTime()/1000) - timescale);

            // Show the loader if the request takes too long
            showLoaderRef = Async.later(600, function(){
                _this.loader.show();
            });

            //Temp hack, sorry Tyler
            var startTime = null;
            var endTime = null;


            var date = $('#datepicker-invisible').text();

            var currentTime = new Date();
            var timeoffset = currentTime.getTimezoneOffset();

            switch(date) {
                case 'defauflt':
                    startTime=Date.UTC(year,month,day) / 1000 + timeoffset*60 - 21600; //subtract 6 hours as a buffer
                    endTime = startTime + 129600
                    break;
                default:
                    var date1 = date.split('|')[0].split('/')
                    var date2 = date.split('|')[1].split('/')

                    startTime=Date.UTC(date1[2],date1[1],date1[0]) / 1000 + timeoffset*60 -21600 ;
                    endTime=Date.UTC(date2[2],date2[1],date2[0]) / 1000 + timeoffset*60 + 108000;

                    // else {
                    //     endTime = startTime + 129600; //add twelve hours + 24 hrs (6 hrs to negate the buffer, 6 to add to the buffer)
                    // }
            }   
            console.log('starttime ' + startTime);
             console.log('endttime ' + endTime);

            // Api.get_streams_by_location(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1], since_time, 'now', function(streams){
            Api.get_streams_by_location(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1], startTime, endTime, function(streams){
                // Don't show the loader/remove the loader when we're done
                clearTimeout(showLoaderRef);
                _this.loader.hide();

                var new_pins = new PinCollection();
                for (var i in streams) {
                    var stream = streams[i];
                    var coords = stream[stream.length - 1]['coord'];
                    var pin = new Pin(coords[0], coords[1], i, {stream_id: i});
                    new_pins.addOrUpdatePin(pin);
                }

                _this.mainMap.Pins.replace(new_pins);
            }, function(){
                Log('warn', 'Could not update the map');
            })
        }
