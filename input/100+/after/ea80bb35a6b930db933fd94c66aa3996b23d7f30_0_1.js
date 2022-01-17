function(){
    var CompositeView = Backbone.Marionette.CompositeView.extend({
      itemView: ItemView,
      itemViewContainer: '#missing-container',
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

      spyOn(compositeView, "resetItemViewContainer").andCallThrough();

    });

    it("should throw an error", function(){
      expect(function(){compositeView.render()}).toThrow("Missing `itemViewContainer`");
    });
  }