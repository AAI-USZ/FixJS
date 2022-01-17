function(runner) {
    var specs = runner.specs() || [];

    if (specs.length == 0) {
      return;
    }

    createReporterDom(runner.env.versionString());
    doc.body.appendChild(dom.reporter);

    reporterView = new jasmine.HtmlReporter.ReporterView(dom);
    reporterView.addSpecs(specs, self.specFilter);
  }