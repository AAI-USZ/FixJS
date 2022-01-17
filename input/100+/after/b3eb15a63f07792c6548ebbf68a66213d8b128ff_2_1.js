function() {
    return this.tag in {
      area: true,
      base: true,
      br: true,
      col: true,
      hr: true,
      img: true,
      input: true,
      link: true,
      meta: true,
      param: true,
      command: true,
      keygen: true,
      source: true
    };
  }