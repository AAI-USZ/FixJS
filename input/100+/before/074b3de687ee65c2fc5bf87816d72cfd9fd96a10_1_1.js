function(){
    var element = jQuery("#" + target).get(0);
    var statement = "jQuery('#" + target + "').get(0).reload();";
    element.reload = function (){
        // Continue if times is Infinity or
        // the times limit is not reached
        if (this.reload_check()){
            web2py_ajax_page('get', action, null, target);} }; // reload
    // Method to check timing limit
    element.reload_check = function (){
        if (this.reload_counter == Infinity){return true;}
        else {
            if (!isNaN(this.reload_counter)){
                this.reload_counter -= 1;
                if (this.reload_counter < 0){
                    if (!this.run_once){
                        clearInterval(this.timing);
                        return false;
                    }
                }
                else{return true;}
            } }
            return false;}; // reload check
    if (!isNaN(timeout)){
        element.timeout = timeout;
        element.reload_counter = times;
        if (times > 1){
        // Multiple or infinite reload
        // Run first iteration
        web2py_ajax_page('get', action, null, target);
        element.run_once = false;
        element.timing = setInterval(statement, timeout);
        element.reload_counter -= 1;
        }
        else if (times == 1) {
        // Run once with timeout
        element.run_once = true;
        element.setTimeout = setTimeout;
        element.timing = setTimeout(statement, timeout);
        }
    } else {
        // run once (no timeout specified)
        web2py_ajax_page('get', action, null, target);
    } }