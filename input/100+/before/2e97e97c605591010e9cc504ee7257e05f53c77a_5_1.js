function kh_addEllipsis(view, fakeView, currentFontSize) {
    var viewWidth = view.getBoundingClientRect().width;
    fakeView.style.fontSize = currentFontSize + 'px';
    fakeView.innerHTML = view.value;
    var newPhoneNumber;
    var counter = 1;
    while (fakeView.getBoundingClientRect().width > viewWidth) {
      newPhoneNumber = "..." + view.value.substr(-view.value.length + counter);
      fakeView.innerHTML = newPhoneNumber;
      counter++;
    }

    if (newPhoneNumber) {
      view.value = newPhoneNumber;
    }
  }