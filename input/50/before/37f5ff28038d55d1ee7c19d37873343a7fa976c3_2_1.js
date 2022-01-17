function() {
      expect_texts('#right .build', {
        'h3': 'Build #1',
        '.commit-hash': '565294c',
        '.commit-message': 'Update Capybara',
        '.duration': '20',
        '.finished_at': '2010-11-11T12:00:20Z',
        '.log': 'enginex build 1 log ...'
      });
    }