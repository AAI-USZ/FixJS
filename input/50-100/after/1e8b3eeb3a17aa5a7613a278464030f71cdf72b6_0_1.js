function(e){
        var keycode;
        if (e == null) { // ie
            keycode = event.keyCode;
        } else { // mozilla
            keycode = e.which;
        }
        
        if (!editing) {
            if (keycode == 37) {
                //left
                goPreviousExplicit();
            }
            else if (keycode == 38) {
                //up
                fontLarger();
            }
            else if (keycode == 39) {
                //right
                goNextExplicit();
            }
            else if (keycode == 40) {
                //down
                fontSmaller();
            }
        }
    }