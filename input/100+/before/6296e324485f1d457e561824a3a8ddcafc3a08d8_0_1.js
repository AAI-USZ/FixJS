function(event) {
        if (event.keyCode == 27)
            input.val(""); // escape key
        filter(true);
    }