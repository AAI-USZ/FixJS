function(){
    var CompositeView = Backbone.Marionette.CompositeView.extend({
      itemView: ItemView,
      template: "#composite-child-container-template"
    });

    var compositeView;
    var order;
    var deferredResolved;

    beforeEach(function(){
      order = [];
      loadFixtures("compositeChildContainerTemplate.html");

      var m1 = new Model({foo: "bar"});
      var m2 = new Model({foo: "baz"});
      var collection = new Collection([m1, m2]);

      compositeView = new CompositeView({
        collection: collection
      });

      compositeView.render();
    });

    it("should render the items in to the composite view directly", function(){
      expect(compositeView.$el).toContainHtml("<ul></ul>");
    });
  }