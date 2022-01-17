function showErrorSections() {

    if($("#soundcloud-settings .errors").length > 0) {
        $("#soundcloud-settings").show();
        $(window).scrollTop($("#soundcloud-settings .errors").position().top);
    }
    
    if($("#email-server-settings .errors").length > 0) {
        $("#email-server-settings").show();
        $(window).scrollTop($("#email-server-settings .errors").position().top);
    }
    
    if($("#livestream-settings .errors").length > 0) {
        $("#livestream-settings").show();
        $(window).scrollTop($("#livestream-settings .errors").position().top);
    }
}