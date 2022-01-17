function(){

        var elapsedTime = _selector.val();

        var totalTime = _selector.prop('max');



        //Don't divide by 0.

        var fill = totalTime != 0 ? elapsedTime / totalTime : 0;

        var backgroundImage = '-webkit-gradient(linear,left top, right top, from(#ccc), color-stop('+ fill +',#ccc), color-stop('+ fill+',rgba(0,0,0,0)), to(rgba(0,0,0,0)))';

        _selector.css('background-image', backgroundImage)

    }