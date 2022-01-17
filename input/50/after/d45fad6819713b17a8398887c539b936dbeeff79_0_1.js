function(){
        var collection = new Backbone.Collection();
        collectionView = new EmptyCollectionView({
          collection: collection
        });

        collectionView.render();
      }