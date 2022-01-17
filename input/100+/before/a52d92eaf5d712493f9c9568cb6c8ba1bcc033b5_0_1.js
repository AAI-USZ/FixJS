function nextStatic () {
    count++;
    --pending || onFinish();
  }