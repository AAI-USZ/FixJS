function Busytime() {
    Calendar.Store.Abstract.apply(this, arguments);

    this.ids = Object.create(null);
    this.times = Object.create(null);
  }