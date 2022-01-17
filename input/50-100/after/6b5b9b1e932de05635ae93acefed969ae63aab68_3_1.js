function(key, chk, ctx) {
  if (typeof key === "function") {
    key = key(chk, ctx).data;
    chk.data = "";
  }

  var blocks = this.blocks;

  if (!blocks) return;
  var len = blocks.length, fn;
  while (len--) {
    fn = blocks[len][key];
    if (fn) return fn;
  }
}