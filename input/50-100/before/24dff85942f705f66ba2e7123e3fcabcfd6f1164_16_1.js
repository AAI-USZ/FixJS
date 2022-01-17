function slv_init() {
    this.dataSource = [];
    this.index = 0;

    this.view.addEventListener('click', this);
  }