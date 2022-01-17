function() {
      var fetchSucceeded = false;
      var story = new storybase.models.Story({
        story_id: this.storyId 
      });
      story.fetchSections({
        success: function(sections) {
          fetchSucceeded = true;
          expect(sections.url()).toEqual('/api/0.1/stories/' + story.id + '/sections/');
          expect(sections.length).toEqual(this.fixture.objects.length);
        }
      });
      this.server.respond();
      expect(fetchSucceeded).toEqual(true);
    }