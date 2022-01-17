function DTA_pushContext() {
    dbg_assert(!this._contextPool, "Can't push multiple contexts");

    this._contextPool = new ActorPool(this.conn);
    this.conn.addActorPool(this._contextPool);

    this.threadActor = new ThreadActor(this);
    this._addDebuggees(this.browser.wrappedJSObject);
    this._contextPool.addActor(this.threadActor);
  }