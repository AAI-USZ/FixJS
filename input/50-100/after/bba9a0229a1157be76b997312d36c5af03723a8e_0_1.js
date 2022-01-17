function Balloon(options) {
      this.options = options != null ? options : {};
      this.width = options.width || this.defaultWidth;
      console.log(this.width);
      this.createInfoBox(this.options);
      this.setMap(this.options.map);
      this.customize();
    }