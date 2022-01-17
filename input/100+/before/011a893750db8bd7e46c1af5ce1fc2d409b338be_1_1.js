function() {

  BaseController.prototype.after.apply(this, arguments);

  this.page = this.getPage();

  if (!this.page) {
    this.res.send(404);
    return;
  }

  this.breadcrumbs.push({
    uri: this.req.url,
    title: this.page.title,
    last: true
  });

  this.view.navigation = new View('fragments/navigation.mustache', { 
    pages: this.getNavPages(this.page.uri)
  }).render();

  this.view.breadcrumbs = new View('fragments/breadcrumbs.mustache', { 
    breadcrumbs: this.breadcrumbs
  }).render();

  this.view.scripts = new View('fragments/scripts.mustache').render();
  this.view.page = this.page;
  this.view.controller = this.req.route.controller.charAt(0).toUpperCase() + this.req.route.controller.slice(1);

  // Render the view
  this.res.render(this.page.view, this.view);
}