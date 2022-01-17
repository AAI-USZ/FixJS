function() {
    this.el = $(this.el);
    _.bindAll(this,'updateName','updateIcon','name','askToDelete','openMyPanel','setErrors','setupDynamicExtras','addDynamicExtra' );
    this.render();
  }