function(){
  var defaultExtractor;

  beforeEach(function(){
    defaultExtractor = Backbone.Syphon.KeyExtractors.get();
  });

  afterEach(function(){
    Backbone.Syphon.KeyExtractors.registerDefault(defaultExtractor);
  });

  describe("when registering a global key extractor", function(){
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

  });

  describe("when registering a key extractor for a specific input type", function(){
    var result;

    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input><input type='checkbox' name='chk'></form>");
      }
    });

    beforeEach(function(){
      Backbone.Syphon.KeyExtractors.register("text", function(el){
        return "foo";
      });

      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should use the specific extractor for inputs of that type", function(){
      expect(result).toHaveOwnProperty("foo");
    });

    it("should use the default extractor for other input types", function(){
      expect(result).toHaveOwnProperty("chk");
    });
  });

  describe("when specifying key extractor in the options for serialize", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input data-stuff='bar'></form>");
      }
    });

    var result;
    beforeEach(function(){
      var extractors = new Backbone.Syphon.KeyExtractorSet();
      extractors.registerDefault(function($el){
        return $el.data("stuff");
      });

      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        keyExtractors: extractors
      });
    });

    it("should use the specified key extractors", function(){
      expect(result).toHaveOwnProperty("bar");
    });
  });

}