function(suite, dom, views) {
  this.suite = suite;
  this.dom = dom;
  this.views = views;

  this.element = this.createDom('div', { className: 'suite' },
      this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(this.suite.getFullName()) }, this.suite.description)
  );

  this.appendToSummary(this.suite, this.element);
}