function keyHit(evt) {
    if (!gameEnded) {
        var thisKey;
        var key_left = 37;
        var key_right = 39;
        var key_a = 97;
        var key_s = 115;
        
        if (evt) {
            thisKey = evt.charCode | evt.which;
        }
        else {
            thisKey = window.event.keyCode;
        }
        
        if (thisKey === key_a) {
            //swapColumns();
        }
        else if (thisKey === key_s) {
            dropIngredients();
        }
        else if (thisKey === key_left) {
            updatePlayerSelection("left");
        }
        else if (thisKey === key_right) {
            updatePlayerSelection("right");
        }
        
        updateUI();
    }
    else {
        //clear board
        //init
    }
}