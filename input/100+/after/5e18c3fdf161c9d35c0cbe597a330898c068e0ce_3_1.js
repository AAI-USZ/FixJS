function() {
      expect(function() {
          map = new MM.Map(document.createElement('div'));
      }).not.toThrow();
  }