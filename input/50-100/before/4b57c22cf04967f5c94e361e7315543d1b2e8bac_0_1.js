function () {
        if(this.prop == 'rotate3Di') {
            var style = $(this.elem).css('transform');
            if (style) {
                var m = style.match(/, (-?[0-9]+)deg\)/);
                if (m && m[1]) {
                    return parseInt(m[1]);
                } else {
                    return 0;
                }
            }
        }
        
        return proxied.apply(this, arguments);
    }