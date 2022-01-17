function(file) {
    file = path.join(dest_dir, node_prefix, file);
    queue.push('rm -rf ' + file);
  }