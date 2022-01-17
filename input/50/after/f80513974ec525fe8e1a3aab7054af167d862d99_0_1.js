function(file) {
    file = path.join(node_prefix, file);
    queue.push('rm -rf ' + file);
  }