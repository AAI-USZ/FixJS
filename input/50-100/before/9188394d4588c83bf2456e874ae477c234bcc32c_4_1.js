function(db, router) {
      this.db = db;
      this.router = router;

      this._views = Object.create(null);
      this._routeViewFn = Object.create(null);

      this.timeController = new Calendar.Controllers.Time();
    }