function BaseController(app, req, res) {

  this.app = app;
  this.req = req;
  this.res = res;
  this.view = {};

  this.execute();
}