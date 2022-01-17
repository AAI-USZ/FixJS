function (err, vfs) {
  if (err) throw err;
  watch(vfs);
  // changed(vfs);
}