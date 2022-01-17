function(){
            var $cloneObject = $self.clone();

            $cloneObject.css({
                "position" : "fixed",
                "min-width" : 400
            }).addClass(wrapClass);
            $("#body").after($cloneObject);
            imgPopupUpdateSize($cloneObject);

            var resizeHandler = function(){
                imgPopupUpdateSize($cloneObject);
            };

            var bInit = false;
            var handler = function(e){
                if( bInit ){
                    $cloneObject.remove();
                    $(document).unbind("click", handler );
                    $(document).unbind("resize", resizeHandler );
                } else {
                    bInit = true;
                }
            };
            $(window).bind("resize",resizeHandler);
            $(document).bind("click", handler );
        }