function (counter) {
        if (counter > 0) {
            self.unread_count += counter;
            $("#unread_count").text(self.unread_count + " unread");
            $("#unread_count").removeClass("no_unread");
        }
    }