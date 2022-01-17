function(view) {
            var model = view.model,
                collection = view.collection;
            if(model) {
                unbindModel(view.model);
            }
            if(collection) {
                collection.each(function(model){
                    unbindModel(model);
                });
                collection.unbind('add', collectionAdd);
                collection.unbind('remove', collectionRemove);
            }
        }