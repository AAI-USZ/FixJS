function(e){ //onmouseover
                    if($(this).hasClass('ready')){
                        var thisel = $(this);
                        if(options.zoomIndicator){
                            thisel.find('.zoomindicator').stop(true,true).delay(150).fadeOut(150);
                        }
                        var zoomer = thisel.find('.zoomer');
                        //if the elements don't exist then create them
                        if(!zoomer.length){
                            var mainimage = thisel.find('img');
                            var zoomback = thisel.get(0).href;
                            var zoomerleft = thisel.width() + 50;
                            if(options.zoomPos == 'inside'){
                                zoomerleft = 0;
                            }
                            if(options.zoomLocation == 'left'){ //option to position zoom to the left of the image
                                zoomerleft = -zoomerleft;
                            }
                            if(zoomback){
                                $zoomdiv = $('<span/>',{
                                    'class':'zoomer'
                                }).css({
                                    /* changing these settings - current makes zoom fixed size, commented makes it same size as image */
                                    'width': thisel.width(),//mainimage.width(),
                                    'height': thisel.height(), //mainimage.height(),
                                    'left': zoomerleft,
                                    'top': 0 //mainimage.css('margin-top')
                                }).appendTo(thisel);
                                if(options.zoomPos == 'inside'){
                                    $zoomdiv.css({
                                        'border':0
                                    });
                                }
    
                                var origwidth = mainimage.width();
                                var origheight = mainimage.height();
                
                                $zoomedimg = $('<img/>',{
                                    'src':zoomback
                                }).hide().appendTo(thisel.find('.zoomer')).fadeIn('1000').load(function(){
                                    var zoomwidth = $(this).width();
                                    var zoomheight = $(this).height();
                                    var percentw = (origwidth / zoomwidth) * 100; //the percentage size the regular image is of the zoomed, larger image
                                    var percenth = (origheight / zoomheight) * 100;
                                    $lens = $('<span/>',{
                                        'class':'zoomlens'
                                    }).css({
                                        //set zoomlens to be the same percent size of the product image as the product image is of the zoomed image
                                        'width': (mainimage.parent().width() / 100) * percentw,
                                        'height': (mainimage.parent().height() / 100) * percenth
                                    }).hide(0,function(){
                                        if(options.zoomPos == 'inside'){
                                            $(this).css({
                                                'border': 0,
                                                'background':'none'
                                            });
                                        }
                                    }).appendTo(thisel).fadeIn('600');
                                    positionZoomer(thisel,e);
                                });
                            }
                        }
                        //otherwise just find and show the existing elements
                        else {
                            $(this).find('.zoomer').stop(false,true).fadeIn('1000');
                            $(this).find('.zoomlens').stop(false,true).fadeIn('600');
                        }
                    }
                }