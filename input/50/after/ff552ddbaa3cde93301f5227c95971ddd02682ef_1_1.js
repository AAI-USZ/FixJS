function spam() {
      if (closed) return;
      child.stdin.write('R\n');
      setTimeout(spam, 50);
    }