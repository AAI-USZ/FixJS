function(){
    var result;

    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input></form>");
      }
    });

    beforeEach(function(){
      Backbone.Syphon.KeyExtractors.registerDefault(function(el){
        return "foo";
      });

      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });


    it("should return an object that has a key produced by the key extractor", function(){
      expect(result).toHaveOwnProperty("foo");
    });

  }