function re_click(target) {
    var number = target.dataset.num;
    if (number) {
      CallHandler.call(number);
    }
  }