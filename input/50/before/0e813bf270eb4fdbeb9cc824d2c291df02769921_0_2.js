function(el) {
        // TODO IF Android < 3 support is not required, just use classList
        // concat current className with given string -> split -> unique -> join
        el.className = (struniq(el.className + ' ' + this).split(' ')).join(' ');
    }