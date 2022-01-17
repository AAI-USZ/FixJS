function say_status(msg) {
        if ($status_element) {
            $status_element.stop().show()
            $status_element.text(msg);
        }
    }