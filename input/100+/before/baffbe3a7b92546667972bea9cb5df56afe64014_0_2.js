function(){
            var windowsWidth = $(window).width() ; 
            var cubeAngle    = 90 ;
            base.rotate() ;

            base.$el.find(".face").height($(window).height()).width(windowsWidth);
            // TODO : Find a simply function 
            base.$el.find("#right").css( base.prefix + "transform", "rotateY("+1*cubeAngle+"deg) translateX(  "+windowsWidth/2+"px ) translateZ( "+windowsWidth/2+"px )");
            base.$el.find("#back" ).css( base.prefix + "transform", "rotateY("+2*cubeAngle+"deg) translateX(                   0px ) translateZ( "+windowsWidth + "px )");
            base.$el.find("#left" ).css( base.prefix + "transform", "rotateY("+3*cubeAngle+"deg) translateX( -"+windowsWidth/2+"px ) translateZ( "+windowsWidth/2+"px )");
        }