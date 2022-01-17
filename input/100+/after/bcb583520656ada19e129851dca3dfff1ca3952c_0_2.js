function(e) {
        var self    = this,
            val     = self.$topicInput.val();

        switch (e.which)
        {
        case 13:    // ENTER
            if (val.length > 0)
            {
                // Add a new topic
                self.addTopic({
                    title:  val,
                    items:  []
                });

                self.$topicInput.val('');
                self.$topicInput.blur();

                e.preventDefault();
                e.stopPropagation();
            }
            break;

        case 27:    // ESC
            self.$topicInput.val('');
            self.$topicInput.blur();
            break;
        }

    }