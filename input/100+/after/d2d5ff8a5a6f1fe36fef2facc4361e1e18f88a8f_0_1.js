function(event){
            if(!$(this).hasClass('active')){
                var parentobj = $(this).parents('.thumbnailwrapper');
                var newzoomimage = $(this).find('a').get(0).href;
                var newimage = $(this).find('a').attr('rel');
                var imagewrapper = parentobj.find('.imagemain');
                var bigimage = imagewrapper.find('img');

                margintop = 0;
                marginleft = 0;

                //clear up the previous zoom
                imagewrapper.find('.zoomer').remove();
                imagewrapper.find('.zoomlens').remove();
                imagewrapper.attr('href',newzoomimage);
                imagewrapper.removeClass('ready');

                //now centre the big image vertically and horizontally in the block if needed
                bigimage.attr("src",'').attr("src",newimage).load(function(){
                    if(bigimage.width() < containerwidth){
                        marginleft = (containerwidth - bigimage.width()) / 2;
                    }
                    else {
                        marginleft = 0;
                    }
                    if(bigimage.height() < containerheight){
                        margintop = (containerheight - bigimage.height()) / 2;
                    }
                    else {
                        margintop = 0;
                    }
                    bigimage.css({
                        'margin-top': margintop,
                        'margin-left': marginleft
                    });
                });
                parentobj.find('.imagethumbs li').removeClass('active').removeClass('arrow');
                $(this).addClass('active');
                $(this).addClass('arrow');

                if(options.captions){
                    var caption = $(this).find('img').attr('alt');
                    bigimage.attr('alt',caption);
                    parentobj.find('.caption').html(caption);
                }
            }
            $(this).find('a').blur();
            event.preventDefault();
        }