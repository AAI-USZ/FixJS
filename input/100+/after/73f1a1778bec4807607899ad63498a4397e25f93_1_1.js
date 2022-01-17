function() {
    if (typeof jQuery == 'undefined') {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';

        function callback(){
            script.onload = script.onreadystatechange = null;
            EBCallBackMessageReceived('jquery_initialized');
        };

        if(script.onreadystatechange !== undefined){//ie fix
            script.timer = setInterval( function(){
                    if (script.readyState == 'loaded' || script.readyState == 'complete'){
                        clearInterval(script.timer);
                        callback();
                    }
                }, 100
            );
        } else { //all other browsers
            script.onload = callback;
        }

        script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        head.appendChild(script);
    }
}