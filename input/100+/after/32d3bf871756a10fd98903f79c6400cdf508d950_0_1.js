function createReporterDom(version) {
    dom.reporter = self.createDom('div', { id: 'HTMLReporter', className: 'jasmine_reporter' },
      dom.banner = self.createDom('div', { className: 'banner' },
        self.createDom('span', { className: 'title' }, "Jasmine "),
        self.createDom('span', { className: 'version' }, version)),

      dom.symbolSummary = self.createDom('ul', {className: 'symbolSummary'}),
      dom.alert = self.createDom('div', {className: 'alert'},
        self.createDom('span', { className: 'exceptions' },
          self.createDom('label', { className: 'label', for: 'no_try_catch' }, 'No try/catch'),
          self.createDom('input', { id: 'no_try_catch', type: 'checkbox' }))),
      dom.results = self.createDom('div', {className: 'results'},
        dom.summary = self.createDom('div', { className: 'summary' }),
        dom.details = self.createDom('div', { id: 'details' }))
    );
  }