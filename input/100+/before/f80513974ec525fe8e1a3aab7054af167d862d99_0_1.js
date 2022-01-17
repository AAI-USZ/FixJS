function copy(src, dst, callback) {
  // If src is array - copy each file separately
  if (Array.isArray(src)) {
    src.forEach(function(src) {
      copy(src, dst, callback);
    });
    return;
  }

  dst = path.join(dest_dir, node_prefix, dst);
  var dir = dst.replace(/\/[^\/]*$/, '/');

  // Create directory if hasn't done this yet
  if (dirs.indexOf(dir) === -1) {
    dirs.push(dir);
    queue.push('mkdir -p ' + dir);
  }

  // Queue file/dir copy
  queue.push('cp -rf ' + src + ' ' + dst);
}