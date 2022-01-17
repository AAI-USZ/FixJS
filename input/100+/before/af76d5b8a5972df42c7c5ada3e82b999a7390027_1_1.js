function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'spec/fixtures';
    loadFixtures('story_builder_handlebars.html');
    this.dispatcher = _.clone(Backbone.Events);
    this.view = new storybase.builder.views.SectionEditView({
      dispatcher: this.dispatcher,
      model: new Backbone.Model(),
      story: new Backbone.Model()
    });
  });

  describe('when initializing', function() {
    it('should have an assets property', function() {
      expect(this.view.assets).toBeDefined();
    });
  });

  describe('when initialized with an existing story and section', function () {
    beforeEach(function() {
      var Section = Backbone.Model.extend({
        url: function() {
          return '/api/0.1/stories/357c5885c4e844cb8a4cd4eebe912a1c/sections/dc044f23e93649d6b1bd48625fc301cd/'
        }
      });
      var Story = Backbone.Model.extend({
        url: function() {
          return '/api/0.1/stories/357c5885c4e844cb8a4cd4eebe912a1c/';
        }
      });
      this.view = new storybase.builder.views.SectionEditView({
        dispatcher: this.dispatcher,
        model: new Section({
          id: "dc044f23e93649d6b1bd48625fc301cd",
          layout_template: "<div class=\"section-layout side-by-side\">\n    <div class=\"left\">\n        <div class=\"storybase-container-placeholder\" id=\"left\"></div>\n    </div>\n    <div class=\"right\">\n        <div class=\"storybase-container-placeholder\" id=\"right\"></div>\n    </div>\n</div>\n",
        }), 
        story: new Story(), 
        templateSource: $('#section-edit-template').html()
      });
    });

    describe('when rendering', function() {
      beforeEach(function() {
        this.server = sinon.fakeServer.create();
        this.fixture = this.fixtures.SectionAssets.getList;
        this.server.respondWith(
          "GET",
          '/api/0.1/stories/357c5885c4e844cb8a4cd4eebe912a1c/sections/dc044f23e93649d6b1bd48625fc301cd/assets/',
          this.validResponse(this.fixture)
        );
      });

      afterEach(function() {
        this.server.restore();
      });

      it('should display the assets', function() {
        this.view.render();
        this.server.respond();
        expect(this.view.$el.html()).toContain(this.fixture.objects[0].asset.content);
        expect(this.view.$el.html()).toContain(this.fixture.objects[1].asset.content);
      });
    });
  });

  describe('when receiving the "add:asset" event', function() {
    beforeEach(function() {
      this.asset = new Backbone.Model({
         id: 'bef53407591f4fd8bd169f9cc02672f9',
         type: 'text',
         body: 'Test text asset body',
         content: 'Test text asset body'
      });
      this.dispatcher.trigger('add:asset', this.asset); 
    });

    it('should add the asset to the assets collection', function() {
      expect(this.view.assets.size()).toEqual(1);
      expect(this.view.assets.at(0)).toEqual(this.asset);
    });
  
  });
}