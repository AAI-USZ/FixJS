function do_process_key(event) {
        // dm4c.log("Key up " + event.which)
        if (event.which == 13) {
            var submit_button = $("#page-toolbar button[type=submit]")
            // alert("do_process_key: submit button=\"" + submit_button.text() + "\"")
            submit_button.click()
        }
        return false
    }