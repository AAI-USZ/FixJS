function () {
        self.logerror("Ongoing connection closed");
        if (data_stream) {
            data_stream.destroy();
        }
        if (processing_mail) {
            return self.try_deliver_host(mx);
        }
    }