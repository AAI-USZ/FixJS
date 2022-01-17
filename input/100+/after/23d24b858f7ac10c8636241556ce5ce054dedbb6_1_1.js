function(e) {
        var self    = this,
            val     = self.$topicInput.val();

        if ((e.which === 13) && (val.length > 0))
        {
            // Add a new topic
            var topic   = {
                    title:  val,
                    items:  []
                },
                view    = new TopicView({model: topic});

            self.$topics.append( view.$el );

            self.$topicInput.val('');
            self.$topicInput.blur();

            e.preventDefault();
            e.stopPropagation();
        }
    }