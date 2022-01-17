function slv_init() {
    this.dataSource = [];
    this.index = 0;

    this.albumImage = document.getElementById('views-sublist-header-image');
    this.albumName = document.getElementById('views-sublist-header-name');

    this.view.addEventListener('click', this);
  }