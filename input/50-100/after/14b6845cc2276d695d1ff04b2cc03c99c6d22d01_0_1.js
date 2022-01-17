function Dialog(options) {
  Emitter.call(this);
  options = options || {};
  this.template = render('dialog');
  this.el = $(this.template);
  this.render(options);
  if (active && !active.hiding) active.hide();
  if (exports.effect) this.effect(exports.effect);
  active = this;
}