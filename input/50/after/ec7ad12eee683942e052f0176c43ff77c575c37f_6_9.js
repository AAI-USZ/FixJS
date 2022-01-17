function pg_destroy() {
    delete this.icons;
    this.container.parentNode.removeChild(this.container);
  }