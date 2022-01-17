function (e) {
    // Remove empty fields unless they are the last field
    if (item[0] !== item.parent()[0].lastElementChild && !item.children(".ItemPrice").val())
      item.remove();
  }