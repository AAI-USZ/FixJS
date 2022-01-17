function browser_setUrlButtonMode(mode) {
    this.urlButtonMode = mode;
    switch (mode) {
      case this.GO:
        this.urlButton.src = 'style/images/go.png';
        this.urlButton.style.display = 'block';
        break;
      case this.REFRESH:
        this.urlButton.src = 'style/images/refresh.png';
        this.urlButton.style.display = 'block';
        break;
      case this.STOP:
        // Dont currently have a stop button
        this.urlButton.style.display = 'none';
        break;
    }
  }