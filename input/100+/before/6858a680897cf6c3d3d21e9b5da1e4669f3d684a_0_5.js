f        var _this = this;

        this.mainMap = new Map(JQuery("#map"));
        this.api = null;
        this.timeslider = new TimeSlider(JQuery('#time-slider'));
        this.volume = new Volume(JQuery("#volume"));
        this.sidebar = new Sidebar(JQuery("#sidebar"));
        this.modal = new Modal(JQuery('#modal-page'));
        this.userModal = new Modal(JQuery('#user-modal'));
        this.loader = new Filmstrip(JQuery("#map-loader"), 'assets/img/moving-map-loader.png', [952, 65], [14, 1], 50);
        this.userButton = JQuery('.navbar a.user');
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

            var frame = $('#time-slider-iframe');

            $('#time-slider-iframe').each(function() {
                startTime = $('#time-slider-value1', this.contentWindow.document||this.contentDocument);
                endTime = $('#time-slider-value2', this.contentWindow.document||this.contentDocument);

            });


            // Api.get_streams_by_location(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1], since_time, 'now', function(streams){
            Api.get_streams_by_location(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1], startTime.html(), endTime.html(), function(streams){
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
                }
            });
        }

        this.tokenLogin = function(username, token) {
            _this.api = new Api(token);
            _this.api.get_object_by_key('user', username, function(userdata) {
                userdata.username = username;
                _this.user = new User(userdata);
                var html = '<img src="assets/img/avatar-default-' + (_this.user.gender == 'woman'? 'woman' : 'man') + '.png" /> ' + _this.user.getName();
                JQuery('.navbar a.user').html(html).attr('href', '#username/' + _this.user.username);
                JQuery('#fancybox-close').click();
            }, true);
        }

        this.logout = function() {
            _this.api = false;
            _this.user = false;
            delete localStorage.token;
            delete localStorage.username;
            JQuery('.navbar a.user').html('Login').attr('href', 'assets/static/login.html');
            JQuery(".navbar a.user").fancybox();
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
                } else if (href.substring(0, 6) == '#page/') {
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
            
            //User menu
            this.userButton.mouseover(function(){
                if(localStorage.username){
                    $('#user-menu').removeClass('hidden');
                }
            });

            //Anytime user selects an option, close menu
            $('#user-menu').click(function(){
                $('#user-menu').addClass('hidden');
            });

            $('a#signout').click(function(){
                window.fe.logout();
            });

            $('#map').mouseover(function(){
                $('#user-menu').addClass('hidden');
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
