function () {
        if (!themesVisible) {            
            var themesSize = $('.nav-collapse')[0].scrollHeight;
            $('.themes-box').show();
            var newH = $('.nav-collapse')[0].scrollHeight;
            $('.nav-collapse').height(newH);
            //$('.nav-collapse').collapse('show');
            themesVisible = true;
        }
        return false;
    }