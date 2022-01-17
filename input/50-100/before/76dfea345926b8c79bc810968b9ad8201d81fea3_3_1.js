function() {
    var deflate = spdy.utils.createDeflate(),
        inflate = spdy.utils.createInflate();

    parser = new spdy.parser.create(deflate, inflate);
  }