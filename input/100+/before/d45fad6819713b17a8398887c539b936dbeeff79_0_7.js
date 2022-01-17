function(){
    var Model = Backbone.Model.extend({});

    var Collection = Backbone.Collection.extend({
      model: Model
    });

    var ItemView = Backbone.Marionette.ItemView.extend({
      tagName: "span",
      render: function(){
        this.$el.html(this.model.get("foo"));
      },
      onRender: function(){}
    });

    var CollectionView = Backbone.Marionette.CollectionView.extend({
      itemView: ItemView,

      beforeRender: function(){},

      onRender: function(){},

      onItemAdded: function(view){}
    });

    var collectionView;
    var collection;
    var model;

    beforeEach(function(){
      spyOn(ItemView.prototype, "onRender");

      collection = new Collection();
      collectionView = new CollectionView({
        itemView: ItemView,
        collection: collection
      });
      collectionView.render();

      spyOn(collectionView, "appendHtml").andCallThrough();

      model = new Model({foo: "bar"});
      collection.add(model);
    });

    it("should add the model to the list", function(){
      expect(_.size(collectionView.children)).toBe(1);
    });

    it("should render the model in to the DOM", function(){
      expect($(collectionView.$el)).toHaveText("bar");
    });

    it("should provide the index for each itemView, when appending", function(){
      expect(collectionView.appendHtml.calls[0].args[2]).toBe(0);
    });

    describe("emptyView", function(){

      var EmptyView = Backbone.Marionette.ItemView.extend({
        tagName: "span",
        className: "isempty",
        render: function(){}
      });

      var EmptyCollectionView = Backbone.Marionette.CollectionView.extend({
        itemView: ItemView,
        emptyView: EmptyView
      });


      describe("when rendering a collection view with an empty collection", function(){

        var collectionView;

        beforeEach(function(){
          var collection = new Collection();
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
      });

      describe("when the emptyView has been rendered for an empty collection, then adding an item to the collection", function(){
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
      });

      describe("when the emptyView has been rendered for an empty collection and then collection reset, recieving some values. Then adding an item to the collection", function () {
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
      });

      describe("when the last item is removed from a collection", function(){
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
      });

    });

  }