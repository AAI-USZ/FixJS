function(db, router) {
      this.db = db;
      this.router = router;

      this._views = {};
      this._routeViewFn = {};

      this.timeController = new Calendar.Controllers.Time();
    }