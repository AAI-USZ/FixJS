function(item) {
            var view    = new app.view.ItemView({model:item});
            if ($after.length < 1)
            {
                // First child
                self.$items.append( view.$el );
            }
            else
            {
                view.$el.insertAfter( $after );
            }

            $after = view.$el;
        }