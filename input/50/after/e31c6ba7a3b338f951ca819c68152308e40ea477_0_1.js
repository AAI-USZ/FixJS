function(success, pubdata) {
            if (success) {
                $(window).trigger('lhnav.init', [pubdata, {}, {}]);
            } else {
                debug.error('search.js - Can\'t generate the left hand navigation');
            }
        }