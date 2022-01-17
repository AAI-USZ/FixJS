function () {
            var collection = new Collection();
            collectionView = new EmptyCollectionView({
                collection: collection
            });

            collectionView.render();

            closeSpy = spyOn(EmptyView.prototype, "close");
            closeSpy.andCallThrough();

            collection.reset([{ foo: "bar" }, { foo: "baz"}]);
            
            collection.add({ foo: "wut" });
        }