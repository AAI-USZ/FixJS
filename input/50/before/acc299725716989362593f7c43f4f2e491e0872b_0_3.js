function(obj, functions, time){
            window.clearTimeout(positionTimeoutValue);
            window.positionTimeoutFunctions = function(){
                functions.call(obj);
            }
            positionTimeoutValue = setTimeout(window.positionTimeoutFunctions, time);
        }