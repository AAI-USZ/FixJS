function textarea() {
        var sendb = $("#send_comment")[0];
        $("#commenttextarea").keypress(function(event) {
            if (event.ctrlKey && (event.keyCode==13 || event.keyCode==10) &&
                !sendb.disabled) {
                    $("#commentform").submit();
            }
        });
    }