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

            var date = $('.datepicker').val()

            switch(date) {
                case 'Today':
                    var currentTime = new Date();
                    var month = currentTime.getMonth();
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    startTime=Date.UTC(year,month,day) / 1000;
                    endTime = startTime + 86400;
                    break;
                case 'All':
                    break;
                default:
                    var date = $('#dpstart').val().split('/');
                    startTime=Date.UTC(date[2],date[0]-1,date[1]) / 1000;
                    if($('#dpend').exists()){
                        var dpend = $('#dpend').val().split('/');
                        endTime=Date.UTC(dpend[2],dpend[0]-1,dpend[1]) / 1000;
                    }
                    else {
                        endTime = startTime + 86400 ;    
                    }
            }   

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
