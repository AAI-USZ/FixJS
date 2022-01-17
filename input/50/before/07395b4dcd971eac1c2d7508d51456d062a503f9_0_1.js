function(callback){    //  TODO:
    //return window.requestAnimationFrame ||      //  Figure out what is going on
    //window.webkitRequestAnimationFrame ||       //  with requestAnimationFrame so
    //window.mozRequestAnimationFrame ||          //  I can better control the  
    //window.oRequestAnimationFrame ||            //  animation speed and fps
    //window.msRequestAnimationFrame ||           //
    return function(callback){
        window.setTimeout(callback, 1000 / 120);
    };
}