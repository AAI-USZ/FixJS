function () {
        if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) {
            // it's not realistic to think we can deal with all the bugs
            // of IE 6 and lower. Fortunately, all this is just progressive
            // enhancement.
            return;
        }
        $(function () {
            $('a[rel=tooltip]').tooltip();
            $('span[rel=twipsy]').tooltip();
        });
        // $('#gallery').carousel();
        $("#gallerytabs").tabs('.items > div.item', {
            effect: 'fade',
            fadeOutSpeed: 1000,
            rotate: true
        }).slideshow({
            autoplay: true,
            interval: 6000
        });
    }