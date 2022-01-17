function(){
          var collection = new Collection([{foo: "wut"}]);

          collectionView = new EmptyCollectionView({
            collection: collection
          });

          collectionView.render();

          collection.remove(collection.at(0));
        }