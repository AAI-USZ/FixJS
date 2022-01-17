function() {
    inflate = spdy.utils.zwrap(spdy.utils.createInflate(
      spdy.protocol[2].dictionary
    ));
    deflate = spdy.utils.zwrap(spdy.utils.createDeflate(
      spdy.protocol[2].dictionary
    ));
    framer = new spdy.protocol[2].Framer(deflate, inflate);
  }