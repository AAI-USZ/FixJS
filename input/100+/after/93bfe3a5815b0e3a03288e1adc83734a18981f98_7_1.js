function Child() {
    Calendar.View.apply(this, arguments);

    this.batch = new Calendar.Batch({
      handler: this._handleBatch.bind(this),
      verify: this._verifyBatchItem.bind(this)
    });

    this._busytimes = Object.create(null);
    this.monthId = Calendar.Calc.getMonthId(this.month);

    this._onBusyAdd = this._onBusyAdd.bind(this);
    this._onBusyRemove = this._onBusyRemove.bind(this);

    this.controller = this.app.timeController;
  }