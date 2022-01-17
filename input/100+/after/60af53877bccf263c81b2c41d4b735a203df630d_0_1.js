function(options) {
        
        // add some elements
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-link','info-close']
        });
        
        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';
        $('.galleria-info-link').html("Show info");


        $(this._target).append('<a href="#" class="play" id="galleria-player" />');
        var player = $('#galleria-player');
        if(this._options.autoplay === false){
            player.addClass('play');
        }else{
            player.addClass('pause');
        }

        var galleria = this;
        player.bind(click, function(){
            galleria.playToggle();
            if(player.hasClass('pause')){
                player.removeClass('pause');
                player.addClass('play');
            }else{
                player.removeClass('play');
                player.addClass('pause');
            }
            return false;
        });

        this.bind('pause', function(){
            player.removeClass('pause');
            player.addClass('play');
        });
        
        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }
        
        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( click, function() {
                info.toggle();
            });
        } else {
			info.show();
			this.$('info-link, info-close').hide();
		}
        
        if(options.showInfo){
            //start gallery with info showing
            info.toggle();
        }

        // bind some stuff
        this.bind('thumbnail', function(e) {
            
            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });
                
                if ( e.index === options.show ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', e.index == options.show ? 1 : 0.6);
            }
        });
        
        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            
            this.$('info').toggle( this.hasInfo() );
            
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        });
        
        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }