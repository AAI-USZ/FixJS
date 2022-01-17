function () {
        if (processing_mail) {
            return self.try_deliver_host(mx);
        }
    }