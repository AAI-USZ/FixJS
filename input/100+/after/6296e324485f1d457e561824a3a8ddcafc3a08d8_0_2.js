function(event) {

        if (event.keyCode == 9) { // tab
            $("#index-input", window.parent.document).focus();
            input.attr("value", "");
            return false;            
        }
    }