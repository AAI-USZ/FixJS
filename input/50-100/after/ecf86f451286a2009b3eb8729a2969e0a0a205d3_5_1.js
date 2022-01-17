function(url) {
    url = url.replace(/^\/|\/$/g, '');
    var stack = this.stack;
    for (var index = 0; index < stack.length; index++) {
      if (stack[index].getURL().replace(/^\/|\/$/g, '') == url)
        return stack[index];
    }

    return null;
  }