function (chunk) {
    if (typeof chunk === 'string') {
      chunk = new Buffer(chunk);
    }

    size += chunk.length;
    content.push(chunk);
  }