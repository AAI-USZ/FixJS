function(){
            var iW = $(this).prop('width');
            var iH = $(this).propre('height');
            $(this).attr({
                width:iW,
                height:iH
            }).fadeIn(400);
            $('#showbox-loader').hide();   
            $('#showbox .showbox-menubar').show();
            ShowBox.RESIZE();
        }