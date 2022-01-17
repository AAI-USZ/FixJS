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