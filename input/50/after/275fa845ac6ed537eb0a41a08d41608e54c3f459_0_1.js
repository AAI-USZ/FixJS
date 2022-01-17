function do_process_key(event) {
        // dm4c.log("Key up " + event.which)
        if (event.which == 13 && event.target.nodeName == "INPUT" && event.target.type == "text") {
            var submit_button = $("#page-toolbar button[type=submit]")
            // alert("do_process_key:\nsubmit button=\"" + submit_button.text() +
            //    "\"\ntarget.type=" + js.inspect(event.target.type))
            submit_button.click()
        }
        return false
    }