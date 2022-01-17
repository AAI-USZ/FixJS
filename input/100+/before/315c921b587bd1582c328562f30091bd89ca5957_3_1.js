function() {
        var self = this,
            emptyJson = {
                notify_type: 'notification',
                title: 'You currently have no notifications.',
                text_1: null,
                create_date: null,
                sent_date: null,
                read: true,
                link: null
            };
        self.store(emptyJson);
    }