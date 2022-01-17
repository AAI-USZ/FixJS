function(item) {
            var view    = new app.view.ItemView({model: item});
            
            self.$items.append( view.$el );
        }