function () {
        var collectionView, closeSpy;

        beforeEach(function () {
            var collection = new Collection();
            collectionView = new EmptyCollectionView({
                collection: collection
            });

            collectionView.render();

            closeSpy = spyOn(EmptyView.prototype, "close");
            closeSpy.andCallThrough();

            collection.reset([{ foo: "bar" }, { foo: "baz"}]);
            
            collection.add({ foo: "wut" });
        });

        it("should close the emptyView", function () {
            expect(closeSpy).toHaveBeenCalled();
        });

        it("should show all three items without empty view", function () {
            expect($(collectionView.$el)).toHaveHtml("<span>bar</span><span>baz</span><span>wut</span>");
        });
      }