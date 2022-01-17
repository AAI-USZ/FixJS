function(){
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

      collection = new Backbone.Collection();
      collectionView = new CollectionView({
        itemView: ItemView,
        collection: collection
      });
      collectionView.render();

      spyOn(collectionView, "appendHtml").andCallThrough();

      model = new Backbone.Model({foo: "bar"});
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
  }