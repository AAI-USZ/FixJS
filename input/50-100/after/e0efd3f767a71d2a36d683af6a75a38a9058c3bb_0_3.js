function(e){

    // Right arrow and space go forward.
    if(39 === e.which || 32 === e.which){
        Canvas.forward();

    // Left arrow goes back.
    }else if(37 === e.which){
        Canvas.backward();

    // Anything else will log itself, to make it easier for me to bind new keys to new functions, and return true so that someone else will handle it.
    }else{
        console.log('unknown key', e.which);
        return true;
    }

    // If the keystroke was recognized as a command and handled, we return false, to stop propagation.
    return false;
}