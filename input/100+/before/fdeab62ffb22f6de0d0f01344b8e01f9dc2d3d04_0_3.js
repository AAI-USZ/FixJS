function(e){

    // Right arrow and space go forward
    if(39 === e.which || 32 === e.which){
        canvas.forward();

    // Left arrow goes back
    }else if(37 === e.which){
        canvas.backward();

    }else{
        console.log(e.which);
        return true;
    }
    return false;
}