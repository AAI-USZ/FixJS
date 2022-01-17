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

        this.onLogin = new Event();
        this.onStreamChange = new Event();

        var current_stream_id = '';

        var timescale = 10*60;
        var showLoaderRef;
        this.updateMap = function()
        {
            var bounds = _this.mainMap.getBounds();

            var since_time = Math.floor(((new Date()).getTime()/1000) - timescale);

            // Show the loader if the request takes too long
            showLoaderRef = Async.later(800, function(){
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

                // var markers = [];
                // for (var i in streams) {

                //     var stream = streams[i];
                //     var coords = stream[stream.length - 1]['coord'];
                //     var latLng = new google.maps.LatLng(coords[0], coords[1]);
                //     var marker = new google.maps.Marker({
                //         position: latLng
                //         });
                //     markers.push(marker);
                // }
                // var markerCluster = new MarkerClusterer(_this.mainMap.map(), markers);

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
                    _this.onLogin.apply();
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
                this.user = _this.user

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
                _this.comments.updateCommentsFor(stream_id);
                _this.sidebar.player.playStreamData(data);
                current_stream_id = stream_id;
                _this.onStreamChange.apply(stream_id);
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

            window['fe'] = _this;

            // Clippy
            Mousetrap.bind('up up down down left right left right b a enter', function(){
                var agents = ['Clippy', 'Links', 'Bonzi'];
                var selected_agent = agents[Math.round(Util.random(0, agents.length - 1))];
                clippy.BASE_PATH = 'http://static.tapin.tv/agents/'
                clippy.load(selected_agent, function(agent){
                    agent.show();
                    agent.gestureAt(0,0);
                    agent.speak("You look like you're trying to watch a video. Would you like some help?");
                    Async.every(20000, function(){
                        agent.animate();
                    });
                });
            });

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
            $('#comment-form').click(function(){
                $(this).height(60);
            });

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

            // Vu frontend stuff
            $(document).ready(function() {

                $("a#about-page").fancybox();
                $("a#change-password").fancybox();

                   /* Special date widget */
                    var to = new Date();
                    var from = new Date(to.getTime() - 1000 * 60 * 60 * 24 * 7);

                    $('#datepicker-invisible').text(from.getDate() + '/' + from.getMonth() + '/' + from.getFullYear() + '|' + 
                    to.getDate() + '/' + to.getMonth() + '/' + to.getFullYear());

                    $('#datepicker-calendar').DatePicker({
                      inline: true,
                      date: [from, to],
                      calendars: 3,
                      mode: 'range',
                      current: new Date(to.getFullYear(), to.getMonth() - 1, 1),
                      onChange: function(dates,el) {
                        $('#datepicker-invisible').text(dates[0].getDate() + '/' + dates[0].getMonth() + '/' + dates[0].getFullYear() + '|' + 
                            dates[1].getDate() + '/' + dates[1].getMonth() + '/' + dates[1].getFullYear());

                        // update the range display
                        $('#date-range-field span').text(dates[0].getDate()+' '+dates[0].getMonthName(true)+', '+dates[0].getFullYear()+' - '+
                                                    dates[1].getDate()+' '+dates[1].getMonthName(true)+', '+dates[1].getFullYear());
                      }
                    });

                    var resetUpvoteDownvote = function(newStatus)
                    {
                        if (newStatus == -1) {
                            $('#upvote').removeClass('active');
                            $('#downvote').addClass('active');
                        } else if (newStatus == 1) {
                            $('#upvote').addClass('active');
                            $('#downvote').removeClass('active');
                        } else {
                            $('#upvote').removeClass('active');
                            $('#downvote').removeClass('active');
                        }
                    }

                    $('#upvote').bind('click', function(){
                        if ($(this).hasClass('active')) {
                            _this.api.neutralvote_stream(current_stream_id, function(){ resetUpvoteDownvote(0) } );
                        } else {
                            _this.api.upvote_stream(current_stream_id, function(){ resetUpvoteDownvote(1) } );
                        }
                    });

                    $('#downvote').bind('click', function(){
                        if ($(this).hasClass('active')) {
                            console.log($(this))
                            _this.api.neutralvote_stream(current_stream_id, function(){ resetUpvoteDownvote(0) } );
                        } else {
                            _this.api.downvote_stream(current_stream_id, function(){ resetUpvoteDownvote(-1) } );
                        }
                    });

                    var onDoUpdateUpvoteDownvote = function()
                    {
                        if (typeof(_this.user) !== 'undefined' && _this.user !== null && current_stream_id !== '')
                        {
                            _this.api.get_stream_vote(_this.user.username, current_stream_id, resetUpvoteDownvote);
                        }
                    }

                    _this.onLogin.register(onDoUpdateUpvoteDownvote);
                    _this.onStreamChange.register(onDoUpdateUpvoteDownvote);

                    // initialize the special date dropdown field
                    $('#date-range-field span').text(from.getDate()+' '+from.getMonthName(true)+', '+from.getFullYear()+' - '+
                                                    to.getDate()+' '+to.getMonthName(true)+', '+to.getFullYear());

                    $('#date-range-field').bind('click', function(){
                      $('#datepicker-calendar').toggle();
                      if($('#date-range-field a').text().charCodeAt(0) == 9660) {
                        // switch to up-arrow
                        $('#date-range-field a').html('&#9650;');
                        $('#date-range-field').css({borderBottomLeftRadius:0, borderBottomRightRadius:0});
                        $('#date-range-field a').css({borderBottomRightRadius:0});
                      } else {
                        // switch to down-arrow
                        $('#date-range-field a').html('&#9660;');
                        $('#date-range-field').css({borderBottomLeftRadius:5, borderBottomRightRadius:5});
                        $('#date-range-field a').css({borderBottomRightRadius:5});
                      }
                      return false;
                    });

                    $('html').click(function() {
                      if($('#datepicker-calendar').is(":visible")) {
                        $('#datepicker-calendar').hide();
                        $('#date-range-field a').html('&#9660;');
                        $('#date-range-field').css({borderBottomLeftRadius:5, borderBottomRightRadius:5});
                        $('#date-range-field a').css({borderBottomRightRadius:5});
                      }
                    });

                    $('#datepicker-calendar').click(function(event){
                      event.stopPropagation();
                    });
                  /* End special page widget */
                    });

                    $('#loginform').live('submit', function(event) {
                        event.stopPropagation();
                        var ret = window.fe.login($('#loginform #username').val(), $('#loginform #password').val(), function(){
                            window.fe.modal.hide();
                            $("#loginform #login").attr('disabled', '');
                        }, function(err){
                            alert(err);
                            $("#loginform #login").attr('disabled', '');
                        });
                        $("#loginform #login").attr('disabled', 'true');
                        return false;
            })
            // END Vu frontend stuff

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
            Async.every(4 * 1000, _this.updateMap);
        }

        this.constructor();
    });
