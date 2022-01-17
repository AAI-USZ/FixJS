function(e) {
        if (!_.isEmpty(e)) {
            var t = e.length*1000000;
            var te = e.progress;
            var pct = Math.floor((te/t)*100);
            var tr = Math.floor((t-te)/1000);
          //  console.log([t,te,pct,tr]);
            var elem = $('#playing_box .progress .bar');
            elem.stop(true, true);
            elem.css({
                'width': pct+'%',
                '-webkit-transition': 'none',
                '-ms-transition': 'none',
                '-moz-transition': 'none',
                '-o-transition': 'none',
                'transition': 'none'
            });
            elem.animate({
                'width': '100%'
            },
            tr);
        }
    }