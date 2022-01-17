function () {
        var smallScreen = $(window).width() < 980;
        if (!themesVisible) {
            if (smallScreen) {
                themesSize = $('.nav-collapse')[0].scrollHeight;
            }            
            $('.themes-box').show();            
            if (smallScreen) {
                var newH = $('.nav-collapse')[0].scrollHeight;
                $('.nav-collapse').height(newH);                
            }
            //$('.nav-collapse').collapse('show');
            themesVisible = true;
        } else {
            $('.themes-box').hide();
            if (smallScreen) {
                $('.nav-collapse').height(themesSize);
            }            
            themesVisible = false;            
        }
        return false;
    }