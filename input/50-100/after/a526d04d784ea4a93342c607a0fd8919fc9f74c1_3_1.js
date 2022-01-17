function pm_init() {
    window.addEventListener('mozbrowseropenwindow', this.open.bind(this));
    window.addEventListener('mozbrowserclose', this.close.bind(this));

    window.addEventListener('home', this.backHandling.bind(this));
  }