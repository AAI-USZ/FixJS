function() {
    inflate = spdy.utils.zwrap(spdy.utils.createInflate());
    deflate = spdy.utils.zwrap(spdy.utils.createDeflate());
    framer = new spdy.protocol[2].Framer(deflate, inflate);
  }