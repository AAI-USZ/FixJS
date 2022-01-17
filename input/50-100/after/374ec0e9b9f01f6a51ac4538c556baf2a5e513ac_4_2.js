function(view){

    this.ensureEl();
    this.close();

    view.render();
    this.open(view);

    if (view.onShow) { view.onShow(); }
    view.trigger("show");

    if (this.onShow) { this.onShow(view); }
    this.trigger("view:show", view);

    this.currentView = view;
  }