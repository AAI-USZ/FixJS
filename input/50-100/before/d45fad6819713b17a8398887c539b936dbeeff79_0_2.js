function(){
          var collection = new Collection();
          collectionView = new EmptyCollectionView({
            collection: collection
          });

          collectionView.render();

          closeSpy = spyOn(EmptyView.prototype, "close");

          collection.add({foo: "wut"});
        }