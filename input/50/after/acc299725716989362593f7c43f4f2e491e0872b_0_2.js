function(){
            // 为setTimeOut调整作用域
            var delayFunc = jQuery.proxy(this, "setPosition");
            clearTimeout(window.TurnDelay);
            window.TurnDelay = setTimeout(delayFunc, 1000);
        }