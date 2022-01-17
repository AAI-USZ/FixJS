function(event) {
        if(!event.altKey && !event.ctrlKey &&
           (event.keyCode == 27 || (event.keyCode >= 48 && event.keyCode <= 90)) &&
           document.activeElement != $("#textfilter input")[0]) {
               $("#textfilter input").focus();
        }
        if(event.keyCode == 9) {
            $("#index-input", window.parent.document).focus();
            input.attr("value", "");
            return false;            
        }        
    }