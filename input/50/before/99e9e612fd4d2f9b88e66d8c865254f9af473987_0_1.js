function(sections) {
          fetchSucceeded = true;
          expect(sections.url()).toEqual('/api/0.1/stories/' + story.id + '/sections/');
          expect(sections.length).toEqual(this.fixture.objects.length);
        }