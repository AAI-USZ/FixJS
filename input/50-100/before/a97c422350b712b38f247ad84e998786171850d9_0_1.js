function (e) {
    if (item.parent()[0].childElementCount < 3)
      return;
    if (item.next()[0] === item.parent()[0].lastElementChild && !item.children(".ItemPrice").val())
      item.next().remove();
  }