function(){
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

            window['storage'] = Storage;

            // Clippy
            Async.later(500, function(){
                if (typeof(Mousetrap) !== 'undefined') {
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
                }
            });

            // * * * * * * * * * * * * * * * * * //
            // * *  START VU'S CALENDAR CODE * * //
            // * * * * * * * * * * * * * * * * * //

            var oldLoginHtml = $('#user');
            _this.onLogin.register(function(){
                var html = '<img src="assets/img/avatar-default-' + (_this.user.gender == 'woman'? 'woman' : 'man') + '.png" /> ' + _this.user.getName() + '<b class="caret"></ b>';
                JQuery('a#dropdown-text').html(html);
                JQuery('a#account').attr('href', '#user/' + _this.user.username);
                $('#dropdown-text').attr('data-toggle', 'dropdown');

                // Show upvote and downvote and comment post form
                $('#upvote').removeClass('hidden');
                $('#downvote').removeClass('hidden');
                $('#commentbox').removeClass('hidden');
            });

            _this.onLogout.register(function(){
                JQuery('a#dropdown-text').html('Login').attr('href', 'assets/static/login.html').fancybox();
                $('#dropdown-text').attr('data-toggle', '');
                $('#user').removeClass('open');

                // Hide upvote/downvote and comment post
                $('#upvote').addClass('hidden');
                $('#downvote').addClass('hidden');
                $('#commentbox').addClass('hidden');
            });

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

            // Do login
            if (Storage.has('username') && Storage.has('token')) {
                _this.tokenLogin(Storage.read('username'), Storage.read('token'));
            } else {
                _this.logout();
            }
        }