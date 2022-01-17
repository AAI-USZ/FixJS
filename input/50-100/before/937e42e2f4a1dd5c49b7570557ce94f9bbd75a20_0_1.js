function(){
            var iW = $(this).width();
            var iH = $(this).height();
            $(this).attr({
                width:iW,
                height:iH
            }).fadeIn(400);
            $('#showbox-loader').hide();   
            $('#showbox .showbox-menubar').show();
            ShowBox.RESIZE();
        }