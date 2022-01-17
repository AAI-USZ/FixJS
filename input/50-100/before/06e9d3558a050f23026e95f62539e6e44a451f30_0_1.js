function(event) {
            if (event.ctrlKey && (event.keyCode==13 || event.keyCode==10)) {
                $("#commentform").submit();
            }
        }