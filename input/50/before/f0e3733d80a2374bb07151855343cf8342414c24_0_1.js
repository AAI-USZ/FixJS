function (chunk) {
    if (typeof chunk === 'string') {
      chunk = Buffer.isBuffer(chunk);
    }

    size += chunk.length;
    content.push(chunk);
  }