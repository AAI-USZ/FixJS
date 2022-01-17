function() {
    var deflate = spdy.utils.createDeflate(),
        inflate = spdy.utils.createInflate();

    parser = new spdy.parser.create({
      socket: {
        setNoDelay: function() {}
      }
    }, deflate, inflate);

    parser.createFramer(2);
  }