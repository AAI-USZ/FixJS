function(selector, settings){

        //default config
        var config = {
        };
        if (settings){$.extend(config, settings);}
        
        //Test if mandatory options are here
        if(config.sd_video_url === undefined)
            throw 'At least one sd_video_url must be given';
        
        //Get selected elements
        var vid = $('video' + selector);
        
        //html5 video support test :
        if(!document.createElement('video').canPlayType)
            throw 'HTML5 video unsupported';
            
        //Parameters check : only one video tag must be selected 
        if(vid[0] === undefined)
            throw 'Selected element is empty';
        if(vid.length > 1)
            throw 'Multiple video tag selected';
            
        if(config.hd_video_url === undefined)
            config.hd_video_url = config.sd_video_url;
        
        var _vid = vid.clone();
        var parent = vid.parent();
        var _selector = selector.substring(1);
        parent.html('<div id="mobilevid_'+_selector+'" class="mobilevid_container"><div class="play-control"></div></div>');
        var container = $('#mobilevid_'+_selector);
        
        
        if(config.poster_url !== undefined)
            _vid.attr('poster', config.poster_url);
    
        //we load hd version of the video on large ipad screen and high density pixel screens
        if(screen.width >= 768 || window.devicePixelRatio > 1.5)
        {
            _vid[0].src = config.hd_video_url;
            _vid[0].load();
        }
        else
        {
            _vid[0].src = config.sd_video_url;
            _vid[0].load();
        }
    
        //we display controls on tablets
        if(screen.width >= 768)
        {
            _vid.attr("controls",true);
        }
        else if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))) {
            //play button activated by default on iPhone / iPod so we only add a play button on other devices.
            container.children('.play-control').addClass('play-button ');
    
            _vid.click(function(){
                _vid[0].play();
            });
            
            container.children('.play-control').click(function(){
                _vid[0].play();
            }); 
        }
        
        //we have to clone our vid with the new parameters. We also fix width for windows phone terminals
        _vid.prependTo(container).css('width', '100%');
        vid.remove();
        
        return this;
    }