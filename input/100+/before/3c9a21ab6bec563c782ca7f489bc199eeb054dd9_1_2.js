function(){
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
                window.fe.logout();
            });

            $('a#stream').click(function(){
                alert();
            });

            $('#more').click(function(){
                var comment = $("div id='comments'><div class='comment'><div class='user-icon'></div><div class='body'>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non!<div class='time'>about 20 minutes ago</div></div></div>");
                var comment2 = $("div id='comments'><div class='comment'><div class='user-icon'></div><div class='body'>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non!<div class='time'>about 20 minutes ago</div></div></div>");

                $('#comments').append(comment);
                $('#comments').append(comment2);
            });

            //Comment submission

            $('#submit-comment').click(function(){
                var comment = $('#comment-form').val();
                var params = 'cookie=banana&cheese=taco';

                _this.api.update_object_by_key('comment', '23432', params, function(data) {
                    alert(data);
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