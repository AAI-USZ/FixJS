function(){
            base.options  = $.extend({},$.Cube.defaultOptions, options);
            
            // TODO : Make this initial position as an option  
            base.position = 0  ;      

            if (typeof(document.body.style.tranform) != 'undefined') {
                base.prefix = "";
            } else if (typeof(document.body.style.MozTransform) != 'undefined') {
                base.prefix = "-moz-";
            } else if (typeof(document.body.style.webkitTransform) != 'undefined') {
                base.prefix = "-webkit-";
            } else {
                base.prefix = "";
            }

            /* Key binding for using the arrowkeys to rotate the cube */
            // TODO : propose options for key binding 
            // TODO : Test if defaultOptions.loop == true, and maybe a better way to do this
            // TODO : Error when first left 
            $('body').keyup(function (event) {
                if (event.keyCode == 37) {
                    event.preventDefault(); 
                    base.position = base.position > 0 ? --base.position : 3 ; 
                    base.rotate(); 
                } else if (event.keyCode == 39) {
                    event.preventDefault(); 
                    base.position++; 
                    base.rotate(); 
                } 
            });

            // TODO : Find a better way to do that (without CSS file)            
    
            $('body').css(base.prefix + "perspective",800);

            base.$el.css(base.prefix + "transform-style", "preserve-3d")
                    .css(base.prefix + "transition"     , base.prefix + "transform 1s");

            base.$el.find(".face").css("position"                         ,"absolute")
                                  .css(base.prefix + "backface-visibility", "hidden");

            $('*').css({margin : 0 ,padding: 0});
            
            /* Event binding for resizing the cube when the windows size is modified */
            $(window).resize(base.resize);
            base.resize(); 
        }