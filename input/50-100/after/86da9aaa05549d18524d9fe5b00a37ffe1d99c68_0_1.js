function(event) {
            if (event.keyCode == 27) { // escape
                input.attr("value", "");
            }
            if (event.keyCode == 9) { // tab
                $("#template").contents().find("#mbrsel-input").focus();
                input.attr("value", "");
                return false;
            } 
            textFilter();
        }