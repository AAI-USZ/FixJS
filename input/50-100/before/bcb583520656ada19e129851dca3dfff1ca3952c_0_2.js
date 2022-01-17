function(item) {
            var view    = new ItemView({model:item});
            view.$el.insertAfter( $after );

            $after = view.$el;
        }