f        var _this = this;

        this.mainMap = new Map(JQuery("#map"));
        this.api = null;
        this.timeslider = new TimeSlider(JQuery('#time-slider'));
        this.volume = new Volume(JQuery("#volume"));
        this.sidebar = new Sidebar(JQuery("#sidebar"));
        this.modal = new Modal(JQuery('#modal-page'));
        this.userModal = new Modal(JQuery('#user-modal'));
        this.loader = new Filmstrip(JQuery("#map-loader"), 'assets/img/moving-map-loader.png', [952, 65], [14, 1], 50);
        this.userButton = JQuery('a#dropdown-text');
        this.api = false;
        this.user = false;

        var timescale = 10*60;
        var showLoaderRef;
        this.updateMap = function()
        {
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
                    var coords = streams[i][0]['coord'];
                    var pin = new Pin(coords[0], coords[1], i, {stream_id: i});
                    new_pins.addOrUpdatePin(pin);
                }

                _this.mainMap.Pins.replace(new_pins);
            }, function(){
                Log('warn', 'Could not update the map');
            })
        }

        this.updateNav = function(page)
        {
            var matchingPage = JQuery('ul.nav li a[href="' + page + '"]');
            if (matchingPage.length > 0) {
                JQuery('ul.nav li').each(function(){
                    $(this).removeClass('active');
                });
                matchingPage.parent().addClass('active');
            }
        }

        this.login = function(username, password, lambda, lambda_error) {
            if (typeof(lambda) === 'undefined') {
                lmabda = function(){};
            }

            if (typeof(lambda_error) === 'undefined') {
                lambda_error = function(){};
            }

            Api.login(username, password, function(data) {
                if ('error' in data) {
                    Log('info', 'Could not log in: ' + data.error);
                    lambda_error(data.error);
                } else {
                    localStorage.token = data.token;
                    localStorage.username = username;
                    _this.tokenLogin(username, data.token);
                    lambda();
                    JQuery('#fancybox-close').click();
                    JQuery('#dropdown-text').unbind('click.fb');
                }
            });
        }

        this.tokenLogin = function(username, token) {
            _this.api = new Api(token);
            _this.api.get_object_by_key('user', username, function(userdata) {
                userdata.username = username;
                _this.user = new User(userdata);
                var html = '<img src="assets/img/avatar-default-' + (_this.user.gender == 'woman'? 'woman' : 'man') + '.png" /> ' + _this.user.getName() + '<b class="caret"></ b>';
                JQuery('a#dropdown-text').html(html);
                JQuery('a#account').attr('href', '#user/' + _this.user.username);
                $('#dropdown-text').attr('data-toggle', 'dropdown');
            }, true);
        }

        this.logout = function() {
            _this.api = false;
            _this.user = false;
            delete localStorage.token;
            delete localStorage.username;
            JQuery('a#dropdown-text').html('Login').attr('href', 'assets/static/login.html').fancybox();
            // $('#dropdown-text').removeAttr('data-toggle'); need to get this to work
        }

        this.showVideo = function(stream_id)
        {
            Log('debug', 'Showing video for pin', stream_id);
            Api.get_stream_by_stream_id(stream_id, function(data){
                _this.sidebar.player.playStreamData(data);
            }, true);
        }

        var showVideoForPin = function(pin)
        {
            window.location.hash = 'video/' + pin.Data.stream_id + '/now';
        }

        // Used for debugging
        window.onStage = function() {
            Log('info', 'Switching API calls to stage.');
            Config['api']['base'] = 'http://stage.api.tapin.tv/web/';
        }
        window.onProd = function() {
            Log('info', 'Switching API calls to prod.');
            Config['api']['base'] = 'http://api.tapin.tv/web/';
        }

        $.fn.exists = function () {
            return this.length !== 0;
        }

        this.constructor = function(){
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

        this.constructor();
    });
