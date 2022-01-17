function(e, req, settings, exception) {
        if (req.status == 404) {
            var msg = "Url: " + settings.url + "<br/>" + req.responseText;
            confirm_dialog(msg, null, "404 Error", ["OK"], 360, 200);
        } else if (req.status == 403) {
            // Denied (E.g. session timeout) Refresh - will redirect to login page
            window.location.reload();
        } else if (req.status == 500) {
            // Our 500 handler returns only the stack-trace if request.is_json()
            var error = req.responseText;
            feedback_dialog(error);
        }
    }