function(){

      var collectionView;

      beforeEach(function(){
        var collection = new Backbone.Collection();
        collectionView = new EmptyCollectionView({
          collection: collection
        });

        collectionView.render();
      });

      it("should append the html for the emptyView", function(){
        expect($(collectionView.$el)).toHaveHtml("<span class=\"isempty\"></span>");
      });

      it("should reference each of the rendered view items", function(){
        expect(_.size(collectionView.children)).toBe(1);
      });
    }