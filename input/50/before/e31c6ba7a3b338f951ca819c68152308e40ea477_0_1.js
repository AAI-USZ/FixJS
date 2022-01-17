function(success, pubdata) {
            if (success) {
                $(window).trigger('lhnav.init', [pubdata, {}, {}]);
            } else {
                debug.error('createnew.js - Can\'t generate the left hand navigation');
            }
        }