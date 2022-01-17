function(){
        var collectionView, closeSpy;

        beforeEach(function(){
          var collection = new Collection([{foo: "wut"}]);

          collectionView = new EmptyCollectionView({
            collection: collection
          });

          collectionView.render();

          collection.remove(collection.at(0));
        });

        it("should append the html for the emptyView", function(){
          expect($(collectionView.$el)).toHaveHtml("<span class=\"isempty\"></span>");
        });

        it("should reference each of the rendered view items", function(){
          expect(_.size(collectionView.children)).toBe(1);
        });
      }