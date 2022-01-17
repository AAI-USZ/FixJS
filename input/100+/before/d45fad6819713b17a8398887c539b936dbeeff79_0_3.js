function(){
        var collectionView, closeSpy;

        beforeEach(function(){
          var collection = new Collection();
          collectionView = new EmptyCollectionView({
            collection: collection
          });

          collectionView.render();

          closeSpy = spyOn(EmptyView.prototype, "close");

          collection.add({foo: "wut"});
        });

        it("should close the emptyView", function(){
          expect(closeSpy).toHaveBeenCalled();
        });

        it("should show the new item", function(){
          expect(collectionView.$el).toHaveText(/wut/);
        });
      }