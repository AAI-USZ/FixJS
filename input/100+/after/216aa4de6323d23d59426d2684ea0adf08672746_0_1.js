function(){
    var setupGlobalEvents = function(){
        window.onscroll = function(){
            console.log('scroll',window.pageYOffset);
            var el = document.getElementById('site_header'),
                c = el.getAttribute('class') || el.className;
            if (window.pageYOffset > 60){
                if (c.indexOf('fixed')<0){
                    el.setAttribute('class',c + ' fixed');
                    el.className = c + ' fixed';
                }
            } else {
                el.setAttribute('class', c.replace('fixed',''));
                el.className = c.replace('fixed','');
            }
        };
    },
    init = function(){
        console.log('init');
        setupGlobalEvents();
    };
    init();
    console.log('anon');
}