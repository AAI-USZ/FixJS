function(item) {
            var view    = new app.View.ItemView({model: item});
            
            self.$items.append( view.$el );
        }