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
                goPrevious();
            }
            else if (keycode == 38) {
                //up
                fontLarger();
            }
            else if (keycode == 39) {
                //right
                goNext();
            }
            else if (keycode == 40) {
                //down
                fontSmaller();
            }
        }
    }