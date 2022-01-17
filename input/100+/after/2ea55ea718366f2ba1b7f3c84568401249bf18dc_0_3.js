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
        this.comments = new Comments(JQuery('#comments'));
        this.api = false;
        this.user = false;

        var current_stream_id = '';

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
            $("#streams").attr('href', '#stream/' + username);
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
                _this.comments.updateCommentsFor(stream_id);
                current_stream_id = stream_id;
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
            if (typeof(localStorage.token) !== 'undefined' && localStorage.token !== null) {
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

            $('a#signout').click(function(){
                _this.logout();
            });

            $('a#stream').click(function(){
                alert();
            });

            //Comment submission

            $('#submit-comment').click(function(){
                var comment = $('#comment-form').val();

                _this.api.post_comment_to_streamid(current_stream_id, comment, function(data) {
                    Log('info', 'Comment posted!');
                    $("#comment-form").val('');
                    Async.later(250, function(){
                        _this.comments.updateCommentsFor(current_stream_id);
                    });
                });
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
