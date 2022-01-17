function(topic) {
            var view    = new TopicView({model: topic});

            self.$topics.append( view.$el );
        }