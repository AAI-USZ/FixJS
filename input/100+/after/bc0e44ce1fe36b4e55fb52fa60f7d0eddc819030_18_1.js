function(date) {
    var id = Calendar.Calc.getMonthId(date),
        el,
        currentEl;

    if (id in this.children) {
      this.currentChild.deactivate();
      this.currentChild = this.children[id];
      this.currentChild.activate();
    } else {
      var display = this.monthsDisplayElement();

      if (this.currentChild) {
        this.currentChild.deactivate();
      }

      this.currentChild = new Calendar.Views.MonthChild({
        app: this.app,
        month: date
      });

      this.currentChild.attach(display);
      this.currentChild.activate();

      this.children[id] = this.currentChild;
    }
  }