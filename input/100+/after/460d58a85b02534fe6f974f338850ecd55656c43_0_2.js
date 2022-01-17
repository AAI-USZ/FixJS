function(){
            this.timeslider.selectTime('now');

            if (typeof(localStorage.token) !== 'undefined') {
                console.log(typeof(localStorage.token), localStorage.token);
                this.tokenLogin(localStorage.username, localStorage.token);
            } else {
                this.logout();
            }

            $("a").live('click', function(event){
                var href = $(this).attr('href');
                if (href == '#') {
                    event.stopPropagation();
                    _this.modal.hide();
                    _this.updateNav(href);
                    $(window).trigger('hashchange');
                    return false;
                } else if (typeof(href) === 'string' && href.substring(0,6) === '#page/') {                    
                    event.stopPropagation();
                    JQuery.ajax({
                        cache: false,
                        url: 'assets/static/' + href.substring(6) + '?nocache=' + (new Date()).getTime(),
                        dataType: 'html',
                        success: function(html){
                            _this.modal.show(html);
                            _this.updateNav(href);
                        }
                    });
                    $(window).trigger('hashchange');
                    return false;
                }
            });

            window.fe = _this;
            

            // * * * * * * * * * * * * * * * * * //
            // * *  START VU'S CALENDAR CODE * * //
            // * * * * * * * * * * * * * * * * * //

            //Handles if is in week state and user selects start to be greater than end
            $("#dpstart" ).datepicker({
                onSelect: function(date) {
                    if( $('#dpend').exists() ){
                        var date = $('#dpstart').val().split('/');
                        var endDate = $('#dpend').val().split('/')
                        startTime=Date.UTC(date[2],date[0]-1,date[1]) / 1000;
                        endTime=Date.UTC(endDate[2],endDate[0]-1,endDate[1]) / 1000;     
                        if(startTime > endTime) {
                            $('#dpend').val($('#dpstart').val());
                       } 
                    }
                }
            });

            //Handles what happens when you click 'lastweek' button
            $('#lastweek').click(function(){
                var currentTime = new Date()
                var month = currentTime.getMonth()+1
                var day = currentTime.getDate()
                var weekPast = day-7
                var year = currentTime.getFullYear()

                month = (month.length > 1) ? month : "0"+month;
                day = (day.length > 1) ? day : "0"+day;
                weekPast = (weekPast.length > 1) ? weekPast : "0"+weekPast;

                //Set value of start time
                $('#dpstart').val(month + "/" + weekPast + "/" + year)

                var to = $('<li></li>').append($('<a>To</a>').attr({cursor : 'none', hover : 'none'}))
                var whiteIcon = $('<i></i>')
                    .attr({class : 'icon-remove icon-white', id : 'iconremove'})
                    .click(function(){
                        to.remove();
                        datepicker.remove();
                        $('#dpstart').after($('<i class="icon-calendar icon-white" id="firsticon"">'))
                    });
                console.log()
                var te = $;
                if($('#dpend').exists()){
                    
                }
                else {
                    //create and add new start time
                    var datepicker = $('<li></li>')
                    .append($('<input>')
                        .attr({width: 80, class : 'datepicker', id : 'dpend', type : 'text', value : month + "/" + day + "/" + year})
                        .datepicker({onSelect: function(date){
                            var date = $('#dpstart').val().split('/');
                            var endDate = $(this).val().split('/')
                            startTime=Date.UTC(date[2],date[0]-1,date[1]) / 1000;
                            endTime=Date.UTC(endDate[2],endDate[0]-1,endDate[1]) / 1000;     
                            if(endTime < startTime) {
                                $('#dpstart').val($(this).val());
                           }
                        }})
                    )
                    .append(whiteIcon);
                    $('#timestart').after(to);
                    to.after(datepicker);
                    $('#firsticon').remove();
                 }
            });

            //End calendar 
            
            $('a#signout').click(function(){
                window.fe.logout();
            });

            $('a#stream').click(function(){
                alert();
            });
           
            // Bind to volume change events
            this.volume.onVolumeChange.register(function(newVolume)
            {
                _this.sidebar.player.setVolume(newVolume);
            });

            this.volume.onMute.register(function(){
                _this.sidebar.player.mute();
            });

            this.volume.onUnmute.register(function(volume){
                this.sidebar.player.unMute();
                _this.sidebar.player.setVolume(volume);
            });


            // Bind to time slider events
            this.timeslider.onTimeChange.register(function(new_time){
                timescale = new_time;
                _this.updateMap();
            });

            // Redraw pins on map move
            this.mainMap.onBoundsChange.register(_this.updateMap);

            // Show video when we click a pin
            this.mainMap.onPinClick.register(showVideoForPin);

            // Get an initial update
            Async.later(1000, _this.updateMap);

            // Fake live
            Async.every(2 * 1000, _this.updateMap);
        }