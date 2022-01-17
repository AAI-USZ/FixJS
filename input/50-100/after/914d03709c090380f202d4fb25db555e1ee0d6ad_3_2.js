function(item, itemIndex) {
            /*
            console.log("TopicView::dragDropExternal: item %d: %j",
                        itemIndex, item);
            // */

            var view    = new app.View.ItemView({model:item});
            if ((! $after) || ($after.length < 1))
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