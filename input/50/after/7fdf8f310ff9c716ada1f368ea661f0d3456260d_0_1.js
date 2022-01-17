function say_status(msg) {
        if ($status_element) {
            $status_element.stop().show().text(msg);
        }
    }