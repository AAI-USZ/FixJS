function(runner) {
  var showPassed, showSkipped;

  this.outerDiv = this.createDom('div', { id: 'TrivialReporter', className: 'jasmine_reporter' },
      this.createDom('div', { className: 'banner' },
        this.createDom('div', { className: 'logo' },
            this.createDom('span', { className: 'title' }, "Jasmine"),
            this.createDom('span', { className: 'version' }, runner.env.versionString())),
        this.createDom('div', { className: 'options' },
            "Show ",
            showPassed = this.createDom('input', { id: "__jasmine_TrivialReporter_showPassed__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showPassed__" }, " passed "),
            showSkipped = this.createDom('input', { id: "__jasmine_TrivialReporter_showSkipped__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showSkipped__" }, " skipped")
            )
          ),

      this.runnerDiv = this.createDom('div', { className: 'runner running' },
          this.createDom('a', { className: 'run_spec', href: '?' }, "run all"),
          this.runnerMessageSpan = this.createDom('span', {}, "Running..."),
          this.finishedAtSpan = this.createDom('span', { className: 'finished-at' }, ""))
      );

  this.document.body.appendChild(this.outerDiv);

  var suites = runner.suites();
  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];
    var suiteDiv = this.createDom('div', { className: 'suite' },
        this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, "run"),
        this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, suite.description));
    this.suiteDivs[suite.id] = suiteDiv;
    var parentDiv = this.outerDiv;
    if (suite.parentSuite) {
      parentDiv = this.suiteDivs[suite.parentSuite.id];
    }
    parentDiv.appendChild(suiteDiv);
  }

  this.startedAt = new Date();

  var self = this;
  showPassed.onclick = function(evt) {
    if (showPassed.checked) {
      self.outerDiv.className += ' show-passed';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-passed/, '');
    }
  };

  showSkipped.onclick = function(evt) {
    if (showSkipped.checked) {
      self.outerDiv.className += ' show-skipped';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-skipped/, '');
    }
  };
}