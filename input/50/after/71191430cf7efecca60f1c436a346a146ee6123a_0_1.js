function(inputContainer) {
            //removing any previous success or error messages
            $(".success, .error").remove();

            // remove the buildid info message
            if(inputContainer) {
                $("#buildid-range").remove();
                inputContainer.removeClass("info");
            }
        }